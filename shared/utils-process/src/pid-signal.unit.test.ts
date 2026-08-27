import { describe, expect, test } from "bun:test"
import { readdirSync, readFileSync } from "node:fs"
import { collapse, folds } from "@shared/utils-narrow/collapse"
import { z } from "zod"
import { type PidReading, type PidSignalReading, readPidSignal } from "./pid-signal"

const nameOf = (reading: PidSignalReading): PidReading =>
  collapse<PidReading, PidReading>(reading, {
    signalable: folds("signalable", "identity — a test observes the reading, it does not decide"),
    "no-such-process": folds("no-such-process", "identity"),
    "exists-not-permitted": folds("exists-not-permitted", "identity"),
    unknown: folds("unknown", "identity"),
  })

const IMPOSSIBLE_PID = 2 ** 31 - 1

interface RefusableScan {
  readonly visiblePids: number
  readonly ourUids: readonly number[]
  readonly capKill: boolean
  readonly refusable: readonly { readonly pid: number; readonly uid: number }[]
}

const UID = z.coerce.number().int().nonnegative()
const CAP_EFF_LINE = /^CapEff:\s*([0-9a-fA-F]+)$/m
const CAP_EFF_MATCH = z.tuple([z.string(), z.string().min(1)])
const UID_LINE = /^Uid:\s*(\d+)\s+\d+\s+(\d+)/m
const UID_MATCH = z.tuple([z.string(), UID, UID])

function holdsCapKill(): boolean {
  try {
    const [, eff] = CAP_EFF_MATCH.parse(
      CAP_EFF_LINE.exec(readFileSync("/proc/self/status", "utf8"))
    )
    return ((BigInt(`0x${eff}`) >> 5n) & 1n) === 1n
  } catch {
    return true
  }
}

function targetUids(pid: number): readonly number[] | undefined {
  try {
    const [, real, saved] = UID_MATCH.parse(
      UID_LINE.exec(readFileSync(`/proc/${pid}/status`, "utf8"))
    )
    return [real, saved]
  } catch {
    return undefined
  }
}

function scanForRefusableSubjects(limit: number): RefusableScan {
  const ourUids = [process.getuid?.() ?? -1, process.geteuid?.() ?? -1]
  const capKill = holdsCapKill()
  const pids = readdirSync("/proc")
    .filter((entry) => /^\d+$/.test(entry))
    .map(Number)
    .sort((a, b) => a - b)

  const refusable: { pid: number; uid: number }[] = []
  if (!capKill)
    for (const pid of pids) {
      const uids = targetUids(pid)
      if (uids === undefined || uids.some((uid) => ourUids.includes(uid))) continue
      refusable.push({ pid, uid: uids[0] ?? -1 })
      if (refusable.length >= limit) break
    }
  return { visiblePids: pids.length, ourUids, capKill, refusable }
}

describe("readPidSignal against a real kernel", () => {
  test("a process that exists and is ours reads `signalable`", () => {
    expect(nameOf(readPidSignal(process.pid))).toBe("signalable")
  })

  test("a pid the kernel cannot know reads `no-such-process`", () => {
    expect(nameOf(readPidSignal(IMPOSSIBLE_PID))).toBe("no-such-process")
  })

  test("never-false-dead, at the KERNEL: pid 1 exists, so it is never reported absent", () => {
    const reading = nameOf(readPidSignal(1))
    expect(reading).not.toBe("no-such-process")
    expect(reading).not.toBe("unknown")
    expect(["signalable", "exists-not-permitted"]).toContain(reading)
  })

  test("a process the kernel must refuse reads `exists-not-permitted` — EPERM arrives intact", () => {
    const scan = scanForRefusableSubjects(8)
    const env = `uid ${scan.ourUids.join("/")}, CAP_KILL ${scan.capKill}, ${scan.visiblePids} pids visible`

    expect(scan.visiblePids).toBeGreaterThan(0)

    for (const subject of scan.refusable) {
      const reading = nameOf(readPidSignal(subject.pid))
      if (reading === "no-such-process") continue
      console.log(`[pid-signal] EPERM leg: pid ${subject.pid}, uid ${subject.uid}; ${env}`)
      expect(reading).toBe("exists-not-permitted")
      return
    }

    console.log(`[pid-signal] DECLARED GAP: no refusable subject — ${env}`)
  })
})

describe("the process-group pids, which do NOT mean what they look like", () => {
  test("pid 0 reads signalable — it is the caller's process GROUP, not a process", () => {
    expect(nameOf(readPidSignal(0))).toBe("signalable")
  })

  test("pid -1 answers about the process TABLE, so its reading is not stable", () => {
    const reading = nameOf(readPidSignal(-1))
    console.log(`[pid-signal] pid -1 read \`${reading}\` here`)
    expect(["signalable", "no-such-process"]).toContain(reading)
  })
})
