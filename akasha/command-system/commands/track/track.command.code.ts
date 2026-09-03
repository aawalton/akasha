import { readdirSync, readFileSync } from "node:fs"
import { join } from "node:path"
import { mountainWallAt, readMountainWallTime } from "@akasha/day/mountain-wall"
import { mistaking } from "../../asking/asking.module.code.ts"
import type { Answer, Given } from "../../calling/calling.module.code.ts"
import { refused } from "../../calling/calling.module.code.ts"
import { writing } from "../write/write.command.code.ts"
import {
  type ActivityDifficulty,
  difficultyForTitle,
  readDifficulty,
  readSafety,
} from "./session-leveling/session-leveling.module.code.ts"

export const SESSION = "session"

export const DAYS_AT = "akasha/alan/tracking/daily/wake-days/pages"

export const ACTIVITIES_AT = "akasha/alan/tracking/session-activities/pages"

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

const VALUED = [TITLE, AT, START, END, DAY, SAFETY, DIFFICULTY, ID]

const BARE = [OPEN, LAST, JSON_SAID, DRY_RUN]

const ACTS = ["open", "switch", "close", "log", "amend", "drop", "split", "show", "file", "check"]

const UNBUILT = ["drop", "split", "file"]

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

const V7 = /^[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/

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
  readonly rows: Row[]
}

export function valueOf(argv: readonly string[], flag: string): string | null {
  const at = argv.indexOf(flag)
  if (at < 0) return null
  const said = argv[at + 1]
  return said === undefined || said.startsWith("--") ? null : said
}

export function dayNow(now: Date): string {
  const wall = mountainWallAt(now)
  const pad = (one: number): string => String(one).padStart(2, "0")
  return `${String(wall.year)}-${pad(wall.month)}-${pad(wall.day)}`
}

export function pathsFor(root: string, day: string): { path: string; page: string } {
  const at = join(root, DAYS_AT, day)
  return {
    path: join(at, `wake-day-${day}.wake-day.sessions.jsonl`),
    page: join(at, `wake-day-${day}.wake-day.ts`),
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
  const at = join(root, ACTIVITIES_AT)
  const held: ActivityDifficulty[] = []
  for (const name of readdirSync(at)) {
    if (!name.endsWith(".session-activity.ts")) continue
    const said = readFileSync(join(at, name), "utf8")
    const title = /title:\s*"([^"]+)"/.exec(said)
    const level = /defaultDifficulty:\s*(-?[\d.]+)/.exec(said)
    if (title?.[1] === undefined || level?.[1] === undefined) continue
    held.push({ title: title[1], defaultDifficulty: Number(level[1]) })
  }
  return held
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
  return { day, path, page: id, rows }
}

export function openIn(rows: readonly Row[]): Row | null {
  const held = rows.filter((one) => one.endTime === undefined)
  return held.length === 1 ? (held[0] ?? null) : null
}

export function mintedAt(now: Date): string {
  const ms = now.getTime()
  const bytes = new Uint8Array(16)
  crypto.getRandomValues(bytes)
  const time = ms.toString(16).padStart(12, "0")
  for (let at = 0; at < 6; at += 1) {
    bytes[at] = Number.parseInt(time.slice(at * 2, at * 2 + 2), 16)
  }
  const sixth = bytes[6] ?? 0
  const eighth = bytes[8] ?? 0
  bytes[6] = (sixth & 0x0f) | 0x70
  bytes[8] = (eighth & 0x3f) | 0x80
  const hex = Array.from(bytes, (one) => one.toString(16).padStart(2, "0")).join("")
  return [
    hex.slice(0, 8),
    hex.slice(8, 12),
    hex.slice(12, 16),
    hex.slice(16, 20),
    hex.slice(20),
  ].join("-")
}

export function instantIn(argv: readonly string[], flag: string, now: Date): string | null {
  const said = valueOf(argv, flag)
  if (said === null) return now.toISOString()
  const reading = readMountainWallTime(said, now)
  return reading.read === "instant" ? reading.iso : null
}

export function sayingFor(argv: readonly string[], flag: string, now: Date): string {
  const said = valueOf(argv, flag) ?? ""
  const reading = readMountainWallTime(said, now)
  return reading.read === "refused" ? reading.saying : `${flag} takes a wall time`
}

export function levelsFor(
  argv: readonly string[],
  title: string,
  carried: Row | null,
  activities: readonly ActivityDifficulty[]
): { safetyLevel?: string; difficultyLevel?: string } | readonly string[] {
  const refusals: string[] = []
  const held: { safetyLevel?: string; difficultyLevel?: string } = {}
  const safety = valueOf(argv, SAFETY)
  if (safety === null) {
    const carriedSafety = carried?.safetyLevel
    if (typeof carriedSafety === "string") held.safetyLevel = carriedSafety
  } else {
    const reading = readSafety(safety)
    if (reading.read === "refused") refusals.push(reading.saying)
    else held.safetyLevel = reading.level
  }
  const difficulty = valueOf(argv, DIFFICULTY)
  if (difficulty === null) {
    const found = difficultyForTitle(title, activities)
    if (found !== null) held.difficultyLevel = found
  } else {
    const reading = readDifficulty(difficulty)
    if (reading.read === "refused") refusals.push(reading.saying)
    else held.difficultyLevel = reading.level
  }
  return refusals.length > 0 ? refusals : held
}

export function faultsIn(rows: readonly Row[], page: string): readonly string[] {
  const said: string[] = []
  const seen = new Set<string>()
  let open = 0
  for (const [at, row] of rows.entries()) {
    const named = `row ${String(at + 1)}`
    for (const key of Object.keys(row)) {
      if (key.includes("-")) said.push(`${named} carries ${key}, which is spelled in kebab`)
      else if (!KEYS.includes(key)) said.push(`${named} carries ${key}, which no declaration names`)
    }
    if (typeof row.id !== "string" || !V7.test(row.id)) {
      said.push(`${named} carries an id that is no uuid version 7`)
    } else if (seen.has(row.id)) said.push(`${named} carries an id another row of this day carries`)
    else seen.add(row.id)
    if (row.dailyTracking !== page) said.push(`${named} names a day no page carries`)
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
      const pad = (at: number): string => String(at).padStart(2, "0")
      const clock = (at: { hour: number; minute: number } | null): string =>
        at === null ? "     " : `${pad(at.hour)}:${pad(at.minute)}`
      const safety = typeof one.safetyLevel === "string" ? one.safetyLevel : "?"
      const level = typeof one.difficultyLevel === "string" ? one.difficultyLevel : "?"
      return `${clock(from)}-${clock(to)}  s${safety}d${level}  ${one.title}  ${one.id}`
    })
    .join("\n")
}

function telling(lines: string): Answer {
  return { report: lines === "" ? [] : [lines], refusals: [], code: 0 }
}

function landed(held: Held, rows: readonly Row[], said: string, given: Given): Answer {
  const body = new TextEncoder().encode(linesOf(rows))
  const at = held.path.startsWith(given.root)
    ? held.path.slice(given.root.length).replace(/^\//, "")
    : held.path
  return writing(["--file-path", at, "--message", said], given, () => ({ bytes: body }))
}

function addressed(argv: readonly string[], rows: readonly Row[], now: Date): Row | string {
  const id = valueOf(argv, ID)
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
  const said = valueOf(argv, AT)
  if (said !== null) {
    const reading = readMountainWallTime(said, now)
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

export function track(argv: readonly string[], given: Given): Answer {
  const now = new Date()
  const noun = argv[0]
  if (noun !== SESSION) {
    return mistaking([
      `${SESSION} is the only thing this acts on, and this call names ${noun ?? "none"}`,
    ])
  }
  const act = argv[1]
  if (act === undefined || !ACTS.includes(act)) {
    return mistaking([`the act is the second word, and ${act ?? "none"} is no act this takes`])
  }
  if (UNBUILT.includes(act)) {
    return refused(`\`${act}\` states what it takes on its page and carries no act yet`, 1)
  }
  const rest = argv.slice(2)
  for (const said of rest) {
    if (said.startsWith("--") && !VALUED.includes(said) && !BARE.includes(said)) {
      return mistaking([`${said} is no flag this takes`])
    }
  }
  const day = valueOf(rest, DAY) ?? dayNow(now)
  const held = heldFor(given.root, day)
  if (typeof held === "string") return mistaking([held])
  const activities = activitiesIn(given.root)
  const rows = held.rows.map((one) => ({ ...one }))

  if (act === "show") {
    return telling(rest.includes(JSON_SAID) ? JSON.stringify(rows, null, 2) : shownOf(rows))
  }
  if (act === "check") {
    const faults = faultsIn(rows, held.page)
    return faults.length === 0 ? telling("") : mistaking(faults)
  }

  const open = openIn(rows)
  if (act === "amend") {
    const found = addressed(rest, rows, now)
    if (typeof found === "string") return mistaking([found])
    const title = valueOf(rest, TITLE) ?? found.title
    const levels = levelsFor(rest, title, found, activities)
    if (Array.isArray(levels)) return mistaking(levels)
    Object.assign(found, levels, { title })
    const faults = faultsIn(rows, held.page)
    if (faults.length > 0) return mistaking(faults)
    if (rest.includes(DRY_RUN)) return telling(shownOf([found]))
    return landed(held, rows, `Amend ${title} on ${day}`, given)
  }

  if (act === "close" || act === "switch") {
    if (open === null) return mistaking(["this day carries no open stretch to end"])
    const ended = instantIn(rest, AT, now)
    if (ended === null) return mistaking([sayingFor(rest, AT, now)])
    if (new Date(ended).getTime() <= new Date(open.startTime).getTime()) {
      return mistaking(["a stretch cannot end at or before it began"])
    }
    open.endTime = ended
    if (act === "switch") {
      const title = valueOf(rest, TITLE)
      if (title === null) return mistaking([`${TITLE} names what the next stretch is called`])
      const levels = levelsFor(rest, title, open, activities)
      if (Array.isArray(levels)) return mistaking(levels)
      rows.push({
        id: mintedAt(now),
        title,
        startTime: ended,
        dailyTracking: held.page,
        ...levels,
      })
    }
    const faults = faultsIn(rows, held.page)
    if (faults.length > 0) return mistaking(faults)
    if (rest.includes(DRY_RUN)) return telling(shownOf(rows.slice(-2)))
    return landed(held, rows, `${act === "switch" ? "Switch" : "Close"} on ${day}`, given)
  }

  if (act === "open" || act === "log") {
    if (act === "open" && open !== null) {
      return mistaking(["this day carries an open stretch already, so nothing opens here"])
    }
    const title = valueOf(rest, TITLE)
    if (title === null) return mistaking([`${TITLE} names what the stretch is called`])
    const began = instantIn(rest, act === "open" ? AT : START, now)
    if (began === null) return mistaking([sayingFor(rest, act === "open" ? AT : START, now)])
    const levels = levelsFor(rest, title, rows[rows.length - 1] ?? null, activities)
    if (Array.isArray(levels)) return mistaking(levels)
    const one: Row = {
      id: mintedAt(now),
      title,
      startTime: began,
      dailyTracking: held.page,
      ...levels,
    }
    if (act === "log") {
      const ended = valueOf(rest, END)
      if (ended === null) return mistaking([`${END} names the wall time the stretch ended`])
      const reading = readMountainWallTime(ended, now)
      if (reading.read === "refused") return mistaking([reading.saying])
      if (reading.at.getTime() <= new Date(began).getTime()) {
        return mistaking(["a stretch cannot end at or before it began"])
      }
      one.endTime = reading.iso
    }
    rows.push(one)
    rows.sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime())
    const faults = faultsIn(rows, held.page)
    if (faults.length > 0) return mistaking(faults)
    if (rest.includes(DRY_RUN)) return telling(shownOf([one]))
    return landed(held, rows, `${act === "log" ? "Log" : "Open"} ${title} on ${day}`, given)
  }

  return refused(`\`${act}\` carries no act yet`, 1)
}
