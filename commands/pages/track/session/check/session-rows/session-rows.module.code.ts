import { readFileSync } from "node:fs"
import { join } from "node:path"
import { getEsoDayStr } from "akasha/alan/harness/day/eso-day/eso-day.module.code.ts"
import {
  mountainWallAt,
  namesNoDay,
  readMountainWallTime,
} from "akasha/alan/harness/day/mountain-wall/mountain-wall.module.code.ts"
import { padTwo } from "akasha/digit-padding/pad-two/pad-two.module.code.ts"
import {
  statesVersionSeven,
  uuidVersion7,
} from "akasha/id-minting/uuid-version-7/uuid-version-7.module.code.ts"
import { valuesByPath } from "akasha/pages/indexes/reading/index-reading.module.code.ts"
import { numberAt, textIn } from "akasha/pages/value-reading/page-value-reading.module.code.ts"
import {
  type ActivityDifficulty,
  difficultyForTitle,
  readDifficulty,
  readSafety,
} from "../../amend/session-leveling/session-leveling.module.code.ts"
import { dayBefore } from "../../switch/waking/waking.module.code.ts"

export type LevelsReading =
  | { readonly read: "levels"; readonly levels: { safetyLevel?: string; difficultyLevel?: string } }
  | { readonly read: "refused"; readonly refusals: readonly string[] }

export const DAYS_AT = "alan/track/daily/days/pages"

const ACTIVITY_TYPE = "session-activity"

export const TITLE = "--title"
export const AT = "--at"
export const START = "--start"
export const END = "--end"
export const DAY = "--day"
export const SAFETY = "--safety"
export const DIFFICULTY = "--difficulty"
export const ID = "--id"
export const OPEN = "--open"
export const LAST = "--last"
export const JSON_SAID = "--json"
export const DRY_RUN = "--dry-run"
export const LEAVE_GAP = "--leave-gap"
export const MEND = "--mend"
export const FROM_FILE = "--from-file"
export const RELATIONSHIP = "--relationship"

export const VALUED = [TITLE, AT, START, END, DAY, SAFETY, DIFFICULTY, ID, FROM_FILE, RELATIONSHIP]

export const BARE = [OPEN, LAST, JSON_SAID, DRY_RUN, LEAVE_GAP, MEND]

const KEYS = [
  "id",
  "title",
  "startTime",
  "endTime",
  "dailyTracking",
  "safetyLevel",
  "difficultyLevel",
  "version",
  "capacityRate",
  "relationships",
  "assertedAt",
  "owner",
  "breathingSets",
]

const SAFETY_LOW = -2
const SAFETY_HIGH = 5
const DIFFICULTY_LOW = 0
const DIFFICULTY_HIGH = 5

export type Row = Record<string, unknown> & {
  id: string
  title: string
  startTime: string
  dailyTracking: string
  endTime?: string
}

export type Held = {
  readonly day: string
  readonly path: string
  readonly page: string
  readonly pageAt: string
  readonly pageSaid: string
  readonly rows: Row[]
}

export function saidFor(argv: readonly string[], flag: string): string | null {
  const at = argv.indexOf(flag)
  if (at < 0) return null
  const said = argv[at + 1]
  return said === undefined || said.startsWith("--") ? null : said
}

export function dayNow(now: Date): string {
  const wall = mountainWallAt(now)
  return `${String(wall.year)}-${padTwo(wall.month)}-${padTwo(wall.day)}`
}

export function pathsFor(root: string, day: string): { path: string; page: string } {
  const at = join(root, DAYS_AT, day)
  return {
    path: join(at, `day-${day}.day.sessions.jsonl`),
    page: join(at, `day-${day}.day.ts`),
  }
}

export function idIn(said: string): string | null {
  const found = /id:\s*"([0-9a-f-]{36})"/.exec(said)
  return found === null ? null : (found[1] ?? null)
}

export function rowsIn(said: string): Row[] {
  return said
    .split("\n")
    .filter((one) => one.trim() !== "")
    .map((one) => JSON.parse(one) as Row)
}

export function linesOf(rows: readonly Row[]): string {
  return `${rows.map((one) => JSON.stringify(one)).join("\n")}\n`
}

export function activitiesIn(root: string): readonly ActivityDifficulty[] {
  const held: ActivityDifficulty[] = []
  for (const value of valuesByPath(root, ACTIVITY_TYPE).values()) {
    const title = textIn(value, "title")
    const level = numberAt(value, "defaultDifficulty")
    if (title === null || level === null) continue
    held.push({ title, defaultDifficulty: level })
  }
  return held
}

export function saidEachFor(argv: readonly string[], flag: string): readonly string[] {
  const said: string[] = []
  for (const [at, one] of argv.entries()) {
    if (one !== flag) continue
    const next = argv[at + 1]
    if (next === undefined || next.startsWith("--")) continue
    said.push(next)
  }
  return said
}

export function heldFor(root: string, day: string): Held | string {
  const { path, page } = pathsFor(root, day)
  let pageSaid: string
  try {
    pageSaid = readFileSync(page, "utf8")
  } catch {
    return `no day page stands for ${day}, so there is nothing here to act on`
  }
  const id = idIn(pageSaid)
  if (id === null) return `the day page for ${day} carries no id, so no row can name it`
  let rows: Row[] = []
  try {
    rows = rowsIn(readFileSync(path, "utf8"))
  } catch {
    rows = []
  }
  return { day, path, page: id, pageAt: page, pageSaid, rows }
}

export function openIn(rows: readonly Row[]): Row | null {
  const held = rows.filter((one) => one.endTime === undefined)
  return held.length === 1 ? (held[0] ?? null) : null
}

export function mintedAt(now: Date): string {
  return uuidVersion7(now.getTime())
}

export function anchoredIn(argv: readonly string[], said: string): string {
  const day = saidFor(argv, DAY)
  if (day === null || !namesNoDay(said)) return said
  return `${day} ${said.trim()}`
}

export function instantIn(argv: readonly string[], flag: string, now: Date): string | null {
  const said = saidFor(argv, flag)
  if (said === null) return now.toISOString()
  const reading = readMountainWallTime(anchoredIn(argv, said), now)
  return reading.read === "instant" ? reading.iso : null
}

export function sayingFor(argv: readonly string[], flag: string, now: Date): string {
  const said = saidFor(argv, flag) ?? ""
  const reading = readMountainWallTime(anchoredIn(argv, said), now)
  return reading.read === "refused" ? reading.saying : `${flag} takes a wall time`
}

export function levelsFor(
  argv: readonly string[],
  title: string,
  carried: Row | null,
  activities: readonly ActivityDifficulty[]
): LevelsReading {
  const refusals: string[] = []
  const held: { safetyLevel?: string; difficultyLevel?: string } = {}
  const safety = saidFor(argv, SAFETY)
  if (safety === null) {
    const carriedSafety = carried?.safetyLevel
    if (typeof carriedSafety === "string") held.safetyLevel = carriedSafety
  } else {
    const reading = readSafety(safety)
    if (reading.read === "refused") refusals.push(reading.saying)
    else held.safetyLevel = reading.level
  }
  const difficulty = saidFor(argv, DIFFICULTY)
  if (difficulty === null) {
    const found = difficultyForTitle(title, activities)
    if (found !== null) held.difficultyLevel = found
  } else {
    const reading = readDifficulty(difficulty)
    if (reading.read === "refused") refusals.push(reading.saying)
    else held.difficultyLevel = reading.level
  }
  if (refusals.length > 0) return { read: "refused", refusals }
  return { read: "levels", levels: held }
}

export function faultsIn(rows: readonly Row[], held: Held): readonly string[] {
  const said: string[] = []
  const seen = new Set<string>()
  let open = 0
  for (const [at, row] of rows.entries()) {
    const named = `row ${String(at + 1)}`
    const began = new Date(row.startTime)
    const on = Number.isNaN(began.getTime()) ? null : getEsoDayStr(began)
    const opened = on === dayBefore(held.day)
    if (on !== null && on !== held.day && !opened) {
      said.push(`${named} began on ${on} rather than on ${held.day}, whose page holds it`)
    }
    for (const key of Object.keys(row)) {
      if (key.includes("-")) said.push(`${named} carries ${key}, which is spelled in kebab`)
      else if (!KEYS.includes(key)) said.push(`${named} carries ${key}, which no declaration names`)
    }
    if (typeof row.id !== "string" || !statesVersionSeven(row.id)) {
      said.push(`${named} carries an id that is no uuid version 7`)
    } else if (seen.has(row.id)) said.push(`${named} carries an id another row of this day carries`)
    else seen.add(row.id)
    if (row.dailyTracking !== held.page) said.push(`${named} names a day no page carries`)
    for (const [key, low, high] of [
      ["safetyLevel", SAFETY_LOW, SAFETY_HIGH],
      ["difficultyLevel", DIFFICULTY_LOW, DIFFICULTY_HIGH],
    ] as const) {
      const level = row[key]
      if (level === undefined) continue
      const read = Number(level)
      if (typeof level !== "string" || Number.isNaN(read) || read < low || read > high) {
        said.push(`${named} carries a ${key} outside ${String(low)} to ${String(high)}`)
      }
    }
    if (row.endTime === undefined) open += 1
  }
  if (open > 1) said.push(`this day carries ${String(open)} open stretches`)
  return said
}

export function shownOf(rows: readonly Row[]): string {
  return rows
    .map((one) => {
      const from = mountainWallAt(new Date(one.startTime))
      const to = one.endTime === undefined ? null : mountainWallAt(new Date(one.endTime))
      const clock = (at: { hour: number; minute: number } | null): string =>
        at === null ? "     " : `${padTwo(at.hour)}:${padTwo(at.minute)}`
      const safety = typeof one.safetyLevel === "string" ? one.safetyLevel : "?"
      const level = typeof one.difficultyLevel === "string" ? one.difficultyLevel : "?"
      return `${clock(from)}-${clock(to)}  s${safety}d${level}  ${one.title}  ${one.id}`
    })
    .join("\n")
}

export function addressed(argv: readonly string[], rows: readonly Row[], now: Date): Row | string {
  const id = saidFor(argv, ID)
  if (id !== null) {
    const found = rows.find((one) => one.id === id)
    return found ?? `no stretch of this day carries the id ${id}`
  }
  if (argv.includes(OPEN)) {
    const found = openIn(rows)
    return found ?? "this day carries no open stretch"
  }
  if (argv.includes(LAST)) {
    const ended = rows.filter((one) => one.endTime !== undefined)
    const found = ended[ended.length - 1]
    return found ?? "this day carries no stretch that has ended"
  }
  const said = saidFor(argv, AT)
  if (said !== null) {
    const reading = readMountainWallTime(anchoredIn(argv, said), now)
    if (reading.read === "refused") return reading.saying
    const held = reading.at.getTime()
    const found = rows.find((one) => {
      const from = new Date(one.startTime).getTime()
      const to =
        one.endTime === undefined ? Number.POSITIVE_INFINITY : new Date(one.endTime).getTime()
      return held >= from && held < to
    })
    return found ?? `no stretch of this day covers ${said}`
  }
  return `this act needs the stretch named, by ${ID}, by ${AT}, by ${OPEN} or by ${LAST}`
}
