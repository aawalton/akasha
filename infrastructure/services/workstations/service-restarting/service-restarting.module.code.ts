import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { whyOf } from "akasha/commands/modules/fault-saying/fault-saying.module.code.ts"
import type { Linking } from "akasha/commands/modules/folder-linking/folder-linking.module.code.ts"
import type { Ran } from "akasha/infrastructure/services/workstations/service-installing/service-installing.module.code.ts"
import { NO_CODE } from "akasha/utils/run/running/running.module.code.ts"
import { counted } from "akasha/utils/text/counted/counted.module.code.ts"

const A_TIMER = ".timer"

const RESTART = "try-restart"

const HELD_BY = "="

const CAME_UP: readonly string[] = [
  "show",
  "--timestamp=unix",
  "-p",
  "Id",
  "-p",
  "ActiveEnterTimestamp",
]

const NAMED = "Id"

const UP_AT = "ActiveEnterTimestamp"

const AT_UNIX = "@"

const A_SECOND = 1000

const A_MINUTE = 60 * A_SECOND

const A_MINUTE_SAID = "minute"

const OWED_AT = ".local/state/workstation-services/service-restarts.json"

export const KEPT_MINUTES = 30

const KEPT_FOR = KEPT_MINUTES * A_MINUTE

export const PUT_RIGHT = "`akasha deploy service-workstation` puts it right"

export type Owing = {
  readonly commit: string
  readonly why: string
  readonly since: string
}

export type Owed = Readonly<Record<string, Owing>>

export type Keeping = {
  readonly owed: Owed
  readonly commit: string
  readonly now: number
}

export type Starting = {
  readonly unit: string
  readonly why: string
}

export type Running = (args: readonly string[]) => Ran

export type Uptimes = {
  readonly up: ReadonlyMap<string, number>
  readonly wrong: readonly string[]
}

const NOTHING_UP: Uptimes = { up: new Map(), wrong: [] }

export function asked(run: Running, args: readonly string[]): Ran {
  try {
    return run(args)
  } catch (thrown) {
    return { code: NO_CODE, out: whyOf(thrown) }
  }
}

export function owedAt(home: string): string {
  return join(home, OWED_AT)
}

export function owedIn(held: unknown): Owed {
  if (held === null || typeof held !== "object" || Array.isArray(held)) return {}
  const kept: Record<string, Owing> = {}
  for (const [unit, one] of Object.entries(held as Record<string, unknown>)) {
    if (one === null || typeof one !== "object") continue
    const said = one as Record<string, unknown>
    if (typeof said.why !== "string") continue
    kept[unit] = {
      commit: typeof said.commit === "string" ? said.commit : "",
      why: said.why,
      since: typeof said.since === "string" ? said.since : "",
    }
  }
  return kept
}

export function owedRead(home: string): Owed {
  const at = owedAt(home)
  if (!existsSync(at)) return {}
  try {
    return owedIn(JSON.parse(readFileSync(at, "utf8")))
  } catch {
    return {}
  }
}

export function owedWrite(home: string, owed: Owed): undefined {
  const at = owedAt(home)
  mkdirSync(dirname(at), { recursive: true })
  writeFileSync(at, `${JSON.stringify(owed, null, 2)}\n`)
}

export function owedOn(owed: Owed, unit: string, why: string, keeping: Keeping): Owed {
  const was = owed[unit]
  const since = was === undefined ? new Date(keeping.now).toISOString() : was.since
  return { ...owed, [unit]: { commit: keeping.commit, why, since } }
}

export function owedOff(owed: Owed, unit: string): Owed {
  if (owed[unit] === undefined) return owed
  return Object.fromEntries(Object.entries(owed).filter(([each]) => each !== unit))
}

export function owedSaid(one: Owing | undefined): string {
  if (one === undefined) return ""
  return `, a start owed since ${one.since}`
}

export function cameUpIn(text: string): ReadonlyMap<string, number> {
  const held = new Map<string, number>()
  let unit: string | null = null
  for (const line of text.split("\n")) {
    const at = line.indexOf(HELD_BY)
    if (at < 1) continue
    const key = line.slice(0, at)
    const value = line.slice(at + 1).trim()
    if (key === NAMED) {
      unit = value
      continue
    }
    if (key !== UP_AT || unit === null || !value.startsWith(AT_UNIX)) continue
    const seconds = Number(value.slice(AT_UNIX.length))
    if (Number.isFinite(seconds)) held.set(unit, seconds * A_SECOND)
  }
  return held
}

export function keptOver(starting: readonly Starting[]): readonly string[] {
  return starting.filter((one) => !one.unit.endsWith(A_TIMER)).map((one) => one.unit)
}

export function cameUpFor(run: Running, starting: readonly Starting[]): Uptimes {
  const units = keptOver(starting)
  if (units.length === 0) return NOTHING_UP
  const done = asked(run, [...CAME_UP, ...units])
  if (done.code !== 0) {
    return {
      up: new Map(),
      wrong: [
        `how long each service had been up could not be asked of systemd, so every service ` +
          `that changed is started again — ${done.out}`,
      ],
    }
  }
  return { up: cameUpIn(done.out), wrong: [] }
}

export function keptBack(unit: string, upAt: number | undefined, now: number): boolean {
  if (unit.endsWith(A_TIMER) || upAt === undefined) return false
  return now - upAt < KEPT_FOR
}

export function keptSaid(one: Starting, upAt: number | undefined, now: number): string {
  const up = upAt === undefined ? 0 : Math.floor((now - upAt) / A_MINUTE)
  return (
    `${one.unit} runs on, though ${one.why} — it came up ${counted(up, A_MINUTE_SAID)} ago and a ` +
    `service keeps ${counted(KEPT_MINUTES, A_MINUTE_SAID)} between starts so its work reaches an ` +
    `end; the start it is owed is taken at the first landing past that`
  )
}

export function startedOver(
  run: Running,
  starting: readonly Starting[],
  home: string,
  keeping: Keeping
): Linking {
  const said: string[] = []
  const up = cameUpFor(run, starting)
  const wrong: string[] = [...up.wrong]
  let owed = keeping.owed
  for (const one of starting) {
    const upAt = up.up.get(one.unit)
    if (keptBack(one.unit, upAt, keeping.now)) {
      said.push(keptSaid(one, upAt, keeping.now))
      owed = owedOn(owed, one.unit, one.why, keeping)
      continue
    }
    const done = asked(run, [RESTART, one.unit])
    if (done.code !== 0) {
      wrong.push(`${one.unit} runs as it did, and ${one.why} — ${done.out}; ${PUT_RIGHT}`)
      owed = owedOn(owed, one.unit, one.why, keeping)
      continue
    }
    const was = owedSaid(keeping.owed[one.unit])
    const how = one.unit.endsWith(A_TIMER) ? "armed" : "started"
    owed = owedOff(owed, one.unit)
    said.push(`${how} ${one.unit} again — ${one.why}${was}`)
  }
  if (owed !== keeping.owed) {
    try {
      owedWrite(home, owed)
    } catch (thrown) {
      wrong.push(`what each service is owed a start for was not written down — ${whyOf(thrown)}`)
    }
  }
  return { said, wrong }
}
