import { readFileSync, statSync } from "node:fs"
import {
  type Reading,
  type Stray,
  strayNow,
} from "akasha/agents/modules/stray-process/stray-process.module.code.ts"
import { takenFor } from "akasha/commands/arguments/modules/taking/argument-taking.module.code.ts"
import {
  answering,
  refusedBy,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { agentStrays as page } from "akasha/commands/pages/agent/strays/agent-strays.command.ts"

const SECOND = 1000

const MINUTE = 60

const HOUR = 3600

const TICKS_A_SECOND = 100

const UNSAID = "?"

const NOTHING = "nothing is stray"

const ALL_READ = "every subagent a live process names was read"

export type Times = { readonly ranMs: number; readonly burnedMs: number }

export type TimesOf = (pid: number) => Times | null

export type ReadingNow = () => Promise<Reading>

export function clockSaid(ms: number): string {
  const whole = Math.max(0, Math.floor(ms / SECOND))
  const hours = String(Math.floor(whole / HOUR))
  const minutes = String(Math.floor(whole / MINUTE) % MINUTE).padStart(2, "0")
  const seconds = String(whole % MINUTE).padStart(2, "0")
  return `${hours}:${minutes}:${seconds}`
}

export function burnedTicksIn(stat: string): number | null {
  const close = stat.lastIndexOf(")")
  if (close === -1) return null
  const rest = stat
    .slice(close + 1)
    .trim()
    .split(/\s+/)
  const own = Number(rest[11])
  const kernel = Number(rest[12])
  if (!Number.isFinite(own) || !Number.isFinite(kernel)) return null
  return own + kernel
}

function timesOf(pid: number): Times | null {
  try {
    const at = `/proc/${String(pid)}`
    const ticks = burnedTicksIn(readFileSync(`${at}/stat`).toString("utf8"))
    if (ticks === null) return null
    return { ranMs: Date.now() - statSync(at).mtimeMs, burnedMs: (ticks / TICKS_A_SECOND) * SECOND }
  } catch {
    return null
  }
}

export function lineOf(one: Stray, times: TimesOf): string {
  const held = times(one.pid)
  const ran = held === null ? UNSAID : clockSaid(held.ranMs)
  const burned = held === null ? UNSAID : clockSaid(held.burnedMs)
  return `${String(one.pid)}  ${one.actingAgentId}  ran ${ran}  burned ${burned}  ${one.cmdline}`
}

export function unreadSaid(unread: readonly string[]): string {
  if (unread.length === 0) return ALL_READ
  return `${String(unread.length)} subagent(s) could not be read: ${unread.join(", ")}`
}

export function reportOf(read: Reading, times: TimesOf): readonly string[] {
  const named = read.strays.map((one) => lineOf(one, times))
  return [...(named.length === 0 ? [NOTHING] : named), unreadSaid(read.unread)]
}

export async function agentStrays(
  argv: readonly string[],
  given: Given,
  reading: ReadingNow = strayNow,
  times: TimesOf = timesOf
): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, [])
  if ("refused" in read) return refusedBy(read.refused)
  return await answering(async () => told(reportOf(await reading(), times)))
}
