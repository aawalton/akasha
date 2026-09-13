import { readFileSync, statSync } from "node:fs"
import type { ProcLivenessEntry } from "akasha/agents/modules/proc-liveness/agent-proc-liveness.module.code.ts"
import { scanProcEntries } from "akasha/agents/modules/proc-scan/proc-scan.module.code.ts"
import {
  actingOf,
  type Reading,
  type Stray,
  strayNow,
} from "akasha/agents/modules/stray-process/stray-process.module.code.ts"
import { ending } from "akasha/utils/process/modules/process-ending/process-ending.module.code.ts"

const SECOND = 1000

const MINUTE = 60

const HOUR = 3600

const TICKS_A_SECOND = 100

const UNSAID = "?"

const ALL_READ = "every subagent a live process names was read"

export type Times = { readonly ranMs: number; readonly burnedMs: number }

export type TimesOf = (pid: number) => Times | null

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

export function timesOf(pid: number): Times | null {
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

function kinBy(
  entries: readonly ProcLivenessEntry[]
): ReadonlyMap<number, readonly ProcLivenessEntry[]> {
  const held = new Map<number, ProcLivenessEntry[]>()
  for (const one of entries) {
    if (one.ppid === undefined) continue
    const born = held.get(one.ppid)
    if (born === undefined) held.set(one.ppid, [one])
    else born.push(one)
  }
  return held
}

export function withDescendants(
  strays: readonly Stray[],
  entries: readonly ProcLivenessEntry[]
): readonly Stray[] {
  const kin = kinBy(entries)
  const taken = new Set(strays.map((one) => one.pid))
  const whole: Stray[] = [...strays]
  for (let at = 0; at < whole.length; at += 1) {
    const one = whole[at]
    if (one === undefined) continue
    for (const born of kin.get(one.pid) ?? []) {
      if (taken.has(born.pid)) continue
      if (actingOf(born) !== null) continue
      taken.add(born.pid)
      whole.push({ pid: born.pid, actingAgentId: one.actingAgentId, cmdline: born.cmdline })
    }
  }
  return whole
}

export type Swept = {
  readonly ended: readonly Stray[]
  readonly said: readonly string[]
  readonly unread: readonly string[]
}

export type Scanning = () => readonly ProcLivenessEntry[]

export type Asking = (entries: readonly ProcLivenessEntry[]) => Promise<Reading>

export type Ending = (pids: readonly number[]) => Promise<unknown>

const SCANNING: Scanning = () => scanProcEntries().entries

const ASKING: Asking = (entries) => strayNow(entries)

const ENDING: Ending = (pids) => ending(pids)

export async function sweptOnce(
  scanning: Scanning = SCANNING,
  asking: Asking = ASKING,
  times: TimesOf = timesOf,
  end: Ending = ENDING
): Promise<Swept> {
  const entries = scanning()
  const read = await asking(entries)
  const ended = withDescendants(read.strays, entries)
  const said = ended.map((one) => lineOf(one, times))
  if (ended.length > 0) await end(ended.map((one) => one.pid))
  return { ended, said, unread: read.unread }
}

export function saidOf(swept: Swept): readonly string[] {
  if (swept.unread.length === 0) return swept.said
  return [...swept.said, unreadSaid(swept.unread)]
}

const LOG = "sweep-stray-processes:"

function logged(line: string): undefined {
  console.log(`${LOG} ${line}`)
  return undefined
}

export async function sweepStrayProcesses(
  say: (line: string) => undefined = logged
): Promise<void> {
  for (const line of saidOf(await sweptOnce())) say(line)
}
