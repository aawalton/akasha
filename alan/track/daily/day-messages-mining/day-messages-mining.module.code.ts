import { type Dirent, readdirSync, readFileSync } from "node:fs"
import { homedir } from "node:os"
import { join } from "node:path"
import { getEsoDayStrAt } from "@akasha/day/eso-day"
import { mergeUncommitted } from "@akasha/pages/page-uncommitted"
import { personasStanding } from "@akasha/personas/persona-reading"
import { type Counted, dayPageAt } from "../day-messages/day-messages.module.code.ts"

const PROJECTS = "projects"

const TRANSCRIPT = ".jsonl"

const PERSONA_MESSAGES = "personaMessages"

const SOURCE = '"promptSource"'

const WROTE = new Set(["typed", "queued"])

const NAMED = /You are persona `([a-z0-9-]+)`/g

const SEAT_PAGE = /seat-system\/seats\/pages\/([a-z0-9-]+)\.seat\.ts/g

const GREETED = /^\s*(?:hi|hey|hello|good morning)[\s,]+([a-z]+)\b/i

const NO_DAY = "no day page is filed under this date, so its messages are counted against no day"

export type Wrote = { readonly at: string; readonly text: string }

export type Transcript = {
  readonly named: readonly string[]
  readonly seatPages: readonly string[]
  readonly greeted: readonly string[]
  readonly wrote: readonly string[]
}

export type Mined = { readonly day: string; readonly counted: readonly Counted[] }

export type Kept = {
  readonly days: number
  readonly rows: number
  readonly unfiled: readonly string[]
}

function caughtBy(line: string, pattern: RegExp): readonly string[] {
  const found: string[] = []
  for (const one of line.matchAll(pattern)) {
    if (one[1] !== undefined) found.push(one[1])
  }
  return found
}

export function namedIn(line: string): readonly string[] {
  return caughtBy(line, NAMED)
}

export function seatPagesIn(line: string): readonly string[] {
  return caughtBy(line, SEAT_PAGE)
}

export function greetedIn(text: string): string | null {
  return GREETED.exec(text)?.[1]?.toLowerCase() ?? null
}

export function wroteIn(line: string): Wrote | null {
  if (!line.includes(SOURCE)) return null
  let held: unknown
  try {
    held = JSON.parse(line)
  } catch {
    return null
  }
  if (typeof held !== "object" || held === null) return null
  const row = held as Readonly<Record<string, unknown>>
  const source = row.promptSource
  const at = row.timestamp
  if (row.type !== "user" || typeof source !== "string" || !WROTE.has(source)) return null
  if (typeof at !== "string") return null
  const message = row.message
  const text =
    typeof message === "object" && message !== null
      ? (message as Readonly<Record<string, unknown>>).content
      : null
  return { at, text: typeof text === "string" ? text : "" }
}

export function transcriptIn(text: string): Transcript {
  const named: string[] = []
  const seatPages: string[] = []
  const greeted: string[] = []
  const wrote: string[] = []
  for (const line of text.split("\n")) {
    named.push(...namedIn(line))
    seatPages.push(...seatPagesIn(line))
    const said = wroteIn(line)
    if (said === null) continue
    wrote.push(said.at)
    const name = greetedIn(said.text)
    if (name !== null) greeted.push(name)
  }
  return { named, seatPages, greeted, wrote }
}

function commonestOf(names: readonly string[], known: ReadonlySet<string>): string | null {
  const times = new Map<string, number>()
  for (const one of names) {
    if (known.has(one)) times.set(one, (times.get(one) ?? 0) + 1)
  }
  let held: string | null = null
  let most = 0
  for (const [name, count] of times) {
    if (count > most) {
      held = name
      most = count
    }
  }
  return held
}

export function heldBy(one: Transcript, known: ReadonlySet<string>): string | null {
  return (
    commonestOf(one.named, known) ??
    commonestOf(one.seatPages, known) ??
    commonestOf(one.greeted, known)
  )
}

function rowsOf(on: ReadonlyMap<string, number>): readonly Counted[] {
  return [...on]
    .sort((one, two) => (one[0] < two[0] ? -1 : 1))
    .map(([personaSlug, sent]) => ({ personaSlug, sent }))
}

export function countedOver(
  read: readonly Transcript[],
  known: ReadonlySet<string>
): readonly Mined[] {
  const days = new Map<string, Map<string, number>>()
  for (const one of read) {
    const slug = heldBy(one, known)
    if (slug === null) continue
    for (const at of one.wrote) {
      const day = getEsoDayStrAt(at)
      const on = days.get(day) ?? new Map<string, number>()
      on.set(slug, (on.get(slug) ?? 0) + 1)
      days.set(day, on)
    }
  }
  return [...days.keys()]
    .sort()
    .map((day) => ({ day, counted: rowsOf(days.get(day) ?? new Map()) }))
}

export function transcriptsIn(store: string): readonly string[] {
  let folders: readonly Dirent[]
  try {
    folders = readdirSync(store, { withFileTypes: true })
  } catch {
    return []
  }
  const found: string[] = []
  for (const folder of folders) {
    if (!folder.isDirectory()) continue
    const at = join(store, folder.name)
    for (const one of readdirSync(at, { withFileTypes: true })) {
      if (one.isFile() && one.name.endsWith(TRANSCRIPT)) found.push(join(at, one.name))
    }
  }
  return found.sort()
}

export function transcriptsHere(): readonly string[] {
  const said = process.env.CLAUDE_CONFIG_DIR
  const base = said === undefined || said === "" ? join(homedir(), ".claude") : said
  return transcriptsIn(join(base, PROJECTS))
}

export function keepMined(root: string, mined: readonly Mined[]): Kept {
  const unfiled: string[] = []
  let days = 0
  let rows = 0
  for (const one of mined) {
    const page = dayPageAt(root, one.day)
    if (page === null) {
      unfiled.push(`${one.day} — ${NO_DAY}`)
      continue
    }
    mergeUncommitted(root, page, { [PERSONA_MESSAGES]: one.counted })
    days += 1
    rows += one.counted.length
  }
  return { days, rows, unfiled }
}

export function mineMessages(root: string): Kept {
  const known = new Set(personasStanding(root).map((one) => one.slug))
  const read = transcriptsHere().map((path) => {
    try {
      return transcriptIn(readFileSync(path, "utf8"))
    } catch {
      return { named: [], seatPages: [], greeted: [], wrote: [] }
    }
  })
  return keepMined(root, countedOver(read, known))
}

export function saidOf(kept: Kept): string {
  const rows = kept.rows === 1 ? "row was" : "rows were"
  const days = kept.days === 1 ? "day" : "days"
  return `${String(kept.rows)} ${rows} counted over ${String(kept.days)} ${days}`
}
