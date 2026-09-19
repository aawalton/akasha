import { mkdirSync, readdirSync, readFileSync, rmdirSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import type { Asked } from "akasha/code/spawning/modules/running/running.module.code.ts"
import {
  delegatedAt,
  ownAt,
  ran,
} from "akasha/code/spawning/modules/running/running.module.code.ts"

const MOUNT = "/sys/fs/cgroup"

const CONTROL = "cgroup.subtree_control"

const PROCS = "cgroup.procs"

const MAX = "cpu.max"

const UNBOUND = "max"

const TURN_ON = "+cpu +memory"

const UNDER = "under"

const OPEN = Number.POSITIVE_INFINITY

const SWEEPS = 20

const POLL = 50

const READING = ["sh", "-c", 'printf %s "$GOMAXPROCS"']

export const NOTHING = "-"

function shareOf(stated: string): number {
  const [held, over] = stated.split(/\s+/)
  if (held === undefined || held === UNBOUND) return OPEN
  const share = Number(held) / Number(over)
  return Number.isFinite(share) && share > 0 ? share : OPEN
}

export function processorsAbove(): string {
  let tightest = OPEN
  let here = String(delegatedAt(String(ownAt())))
  while (here.startsWith(MOUNT) && here !== MOUNT) {
    let stated = ""
    try {
      stated = readFileSync(join(here, MAX), "utf8").trim()
    } catch {}
    tightest = Math.min(tightest, shareOf(stated))
    here = dirname(here)
  }
  return tightest === OPEN ? "" : String(Math.max(1, Math.round(tightest)))
}

function swept(at: string): undefined {
  for (const one of readdirSync(at, { withFileTypes: true })) {
    if (one.isDirectory()) swept(join(at, one.name))
  }
  for (let held = 0; held < SWEEPS; held += 1) {
    try {
      rmdirSync(at)
      return
    } catch {}
    Bun.sleepSync(POLL)
  }
}

export function processorsSeen(chain: readonly string[], asked: Asked = {}): string {
  const home = String(ownAt())
  const made = `akasha-${String(process.pid)}-${String(Bun.nanoseconds())}`
  const root = join(String(delegatedAt(home)), made)
  let at = root
  for (const stated of chain) {
    mkdirSync(at)
    writeFileSync(join(at, CONTROL), TURN_ON)
    if (stated !== NOTHING) writeFileSync(join(at, MAX), stated)
    at = join(at, UNDER)
  }
  mkdirSync(at)
  writeFileSync(join(at, PROCS), String(process.pid))
  try {
    return ran(READING, { ...asked, metered: true }).out
  } finally {
    writeFileSync(join(MOUNT, home, PROCS), String(process.pid))
    swept(root)
  }
}
