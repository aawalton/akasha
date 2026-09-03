import { readdirSync, readFileSync } from "node:fs"
import { isSupervisorCmdline } from "@akasha/seat-system/seat-proc-liveness"
import { z } from "zod"
import type { PidSnapshot } from "../memory-reaper-proc-scan/memory-reaper-proc-scan.module.code.ts"

const FIRST_CAPTURE = z
  .unknown()
  .transform((v) => (Array.isArray(v) && typeof v[1] === "string" ? v[1] : null))

const POSITIVE_OVERRIDE = z.coerce.number().positive().finite()

export function resolvePositiveEnvOverride(envName: string, fallback: number): number {
  const parsed = POSITIVE_OVERRIDE.safeParse(process.env[envName])
  return parsed.success ? parsed.data : fallback
}

export function readPssKb(pid: number, fallbackKb: number): number {
  let rollup: string
  try {
    rollup = readFileSync(`/proc/${pid}/smaps_rollup`, "utf8")
  } catch {
    return fallbackKb
  }
  const captured = FIRST_CAPTURE.parse(rollup.match(/^Pss:\s+(\d+)\s+kB/m))
  return captured === null ? fallbackKb : Number.parseInt(captured, 10)
}

export function readSupervisorPids(snapshots: readonly PidSnapshot[]): readonly number[] {
  const pids: number[] = []
  for (const s of snapshots) {
    let cmdline: string
    try {
      cmdline = readFileSync(`/proc/${s.pid}/cmdline`, "utf8")
    } catch {
      continue
    }
    if (isSupervisorCmdline(cmdline)) pids.push(s.pid)
  }
  return pids
}

export function readPidArgv(pid: number): readonly string[] | undefined {
  let cmdline: string
  try {
    cmdline = readFileSync(`/proc/${pid}/cmdline`, "utf8")
  } catch {
    return undefined
  }
  const argv = cmdline.split("\0").filter((token) => token.length > 0)
  return argv.length === 0 ? undefined : argv
}

export function readUserPidSnapshots(uid: number): readonly PidSnapshot[] {
  const entries = readdirSync("/proc")
  const snapshots: PidSnapshot[] = []
  for (const entry of entries) {
    if (!/^\d+$/.test(entry)) continue
    const pid = Number.parseInt(entry, 10)
    let status: string
    try {
      status = readFileSync(`/proc/${pid}/status`, "utf8")
    } catch {
      continue
    }
    const uidCaptured = FIRST_CAPTURE.parse(status.match(/^Uid:\s+(\d+)/m))
    if (uidCaptured === null) continue
    if (Number.parseInt(uidCaptured, 10) !== uid) continue
    const ppidCaptured = FIRST_CAPTURE.parse(status.match(/^PPid:\s+(\d+)/m))
    if (ppidCaptured === null) continue
    const ppid = Number.parseInt(ppidCaptured, 10)
    const rssCaptured = FIRST_CAPTURE.parse(status.match(/^VmRSS:\s+(\d+)\s+kB/m))
    const vmRssKb = rssCaptured === null ? 0 : Number.parseInt(rssCaptured, 10)
    const pssKb = readPssKb(pid, vmRssKb)
    let name = "unknown"
    try {
      name = readFileSync(`/proc/${pid}/comm`, "utf8").trimEnd()
    } catch {}
    snapshots.push({ pid, ppid, vmRssKb, pssKb, name })
  }
  return snapshots
}
