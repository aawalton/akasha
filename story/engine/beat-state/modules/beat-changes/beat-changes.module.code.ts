import { jsonEqual } from "akasha/code/type/narrowing/modules/json-equal/json-equal.module.code.ts"

export type BeatChange = {
  readonly beat: number
  readonly page: string
  readonly note: string
  readonly key?: string
  readonly from?: unknown
  readonly to?: unknown
  readonly append?: unknown
  readonly make?: Readonly<Record<string, unknown>>
}

export type Filed = {
  readonly propertySlug: string
  readonly ending: string | null
  readonly stated: boolean
  readonly at: string | null
}

export type Reading = {
  readonly exists: (page: string) => boolean
  readonly valueOf: (page: string, key: string) => unknown
  readonly filed: (page: string, key: string) => Filed | null
}

export type Cached = {
  readonly page: string
  readonly values: Readonly<Record<string, unknown>>
  readonly made: boolean
  readonly lines?: Readonly<Record<string, readonly unknown[]>>
}

type Refused = { readonly refused: string }

const LONGEST_NOTE = 100

const PARTED = "/"

const KNOWN: readonly string[] = ["beat", "page", "note", "key", "from", "to", "append", "make"]

export function recordIn(line: string): Readonly<Record<string, unknown>> | null {
  try {
    const held: unknown = JSON.parse(line)
    if (typeof held === "object" && held !== null && !Array.isArray(held)) {
      return held as Readonly<Record<string, unknown>>
    }
  } catch {}
  return null
}

function actsIn(held: Readonly<Record<string, unknown>>): number {
  const setting = "to" in held ? 1 : 0
  const appending = "append" in held ? 1 : 0
  const making = "make" in held ? 1 : 0
  return setting + appending + making
}

function shapeRefused(held: Readonly<Record<string, unknown>>, at: number, beats: number) {
  const where = `change ${at}`
  const unknown = Object.keys(held).find((key) => !KNOWN.includes(key))
  if (unknown !== undefined)
    return `${where} states \`${unknown}\`, and a change states ${KNOWN.join(", ")}`
  const beat = held["beat"]
  if (typeof beat !== "number" || !Number.isInteger(beat) || beat < 1 || beat > beats) {
    return `${where} names no beat from 1 to ${beats}`
  }
  const page = held["page"]
  if (typeof page !== "string" || !page.includes(PARTED)) {
    return `${where} names no page by its address`
  }
  const note = held["note"]
  if (typeof note !== "string" || note.trim() === "" || note.length > LONGEST_NOTE) {
    return `${where} states no note of 1 to ${LONGEST_NOTE} characters`
  }
  if (actsIn(held) !== 1)
    return `${where} states one of \`to\`, \`append\` or \`make\`, and only one`
  if ("make" in held) {
    const made = held["make"]
    return typeof made === "object" && made !== null && !Array.isArray(made)
      ? null
      : `${where} makes a page from no values`
  }
  if (typeof held["key"] !== "string" || held["key"] === "") return `${where} names no \`key\``
  if ("to" in held && !("from" in held)) return `${where} sets \`to\` and states no \`from\``
  return null
}

function changeOf(held: Readonly<Record<string, unknown>>): BeatChange {
  const made = held["make"]
  const key = held["key"]
  return {
    beat: Number(held["beat"]),
    page: String(held["page"]),
    note: String(held["note"]).trim(),
    ...(typeof key === "string" ? { key } : {}),
    ...("from" in held ? { from: held["from"] } : {}),
    ...("to" in held ? { to: held["to"] } : {}),
    ...("append" in held ? { append: held["append"] } : {}),
    ...(typeof made === "object" && made !== null && !Array.isArray(made)
      ? { make: made as Readonly<Record<string, unknown>> }
      : {}),
  }
}

export function changesIn(
  lines: readonly string[],
  beats: number
): readonly BeatChange[] | Refused {
  const changes: BeatChange[] = []
  let last = 0
  for (const [index, line] of lines.entries()) {
    const at = index + 1
    const held = recordIn(line)
    if (held === null) return { refused: `change ${at} is no json object` }
    const wrong = shapeRefused(held, at, beats)
    if (wrong !== null) return { refused: wrong }
    const change = changeOf(held)
    if (change.beat < last) return { refused: `change ${at} comes before beat ${last}'s changes` }
    last = change.beat
    changes.push(change)
  }
  return changes
}

function said(value: unknown): string {
  return value === undefined ? "nothing" : JSON.stringify(value)
}

type Held = Map<string, Map<string, unknown>>

function nowOf(held: Held, reading: Reading, page: string, key: string): unknown {
  const values = held.get(page)
  if (values?.has(key) === true) return values.get(key)
  return reading.valueOf(page, key)
}

type Lines = Map<string, Map<string, unknown[]>>

function besideRefused(filed: Filed, key: string, page: string, where: string): string | null {
  if (filed.ending !== null) return null
  return `${where} writes \`${key}\` of \`${page}\`, held in a file beside the page, and nothing names that file's ending`
}

function madeRefused(reading: Reading, change: BeatChange, where: string): string | null {
  for (const [key, value] of Object.entries(change.make ?? {})) {
    const filed = reading.filed(change.page, key)
    if (filed === null) continue
    if (!Array.isArray(value)) {
      return `${where} makes \`${change.page}\` with \`${key}\`, held in a file beside the page, as no list of lines`
    }
    const unnamed = besideRefused(filed, key, change.page, where)
    if (unnamed !== null) return unnamed
  }
  return null
}

function filedRefused(filed: Filed, change: BeatChange, key: string, where: string) {
  if (change.append === undefined) {
    return `${where} sets \`${key}\` of \`${change.page}\`, held in a file beside the page, and a change appends a line to that file rather than sets it`
  }
  return besideRefused(filed, key, change.page, where)
}

function stepRefused(
  held: Held,
  made: Set<string>,
  reading: Reading,
  change: BeatChange,
  where: string,
  checking: boolean
): string | null {
  const known = made.has(change.page) || reading.exists(change.page)
  if (change.make !== undefined) {
    if (known) return `${where} makes \`${change.page}\`, and that page is there already`
    return madeRefused(reading, change, where)
  }
  if (!known) return `${where} changes \`${change.page}\`, and no page is that`
  const key = change.key ?? ""
  const filed = reading.filed(change.page, key)
  if (filed !== null) return filedRefused(filed, change, key, where)
  const now = nowOf(held, reading, change.page, key)
  if (change.append !== undefined) {
    return now === undefined || now === null || Array.isArray(now)
      ? null
      : `${where} appends to \`${key}\` of \`${change.page}\`, which holds no list`
  }
  if (!checking) return null
  if (!jsonEqual(now ?? null, change.from ?? null)) {
    return `${where} says \`${key}\` of \`${change.page}\` was ${said(change.from)}, and it is ${said(now)}`
  }
  if (typeof change.to === "number" && change.to < 0) {
    return `${where} leaves \`${key}\` of \`${change.page}\` at ${change.to}, and nothing is held below none`
  }
  return null
}

function linesOf(lines: Lines, page: string, key: string): unknown[] {
  const keyed = lines.get(page) ?? new Map<string, unknown[]>()
  lines.set(page, keyed)
  const held = keyed.get(key) ?? []
  keyed.set(key, held)
  return held
}

type Over = {
  readonly held: Held
  readonly made: Set<string>
  readonly lines: Lines
}

function stepped(over: Over, reading: Reading, change: BeatChange) {
  const { held, made, lines } = over
  const values = held.get(change.page) ?? new Map<string, unknown>()
  held.set(change.page, values)
  if (change.make !== undefined) {
    made.add(change.page)
    for (const [key, value] of Object.entries(change.make)) {
      if (reading.filed(change.page, key) !== null && Array.isArray(value)) {
        linesOf(lines, change.page, key).push(...value)
      } else values.set(key, value)
    }
    return
  }
  const key = change.key ?? ""
  if (reading.filed(change.page, key) !== null) {
    linesOf(lines, change.page, key).push(change.append)
    return
  }
  if (change.append === undefined) {
    values.set(key, change.to)
    return
  }
  const now = nowOf(held, reading, change.page, key)
  values.set(key, [...(Array.isArray(now) ? now : []), change.append])
}

function heldOver(
  changes: readonly BeatChange[],
  reading: Reading,
  checking: boolean
): Over | Refused {
  const over: Over = { held: new Map(), made: new Set<string>(), lines: new Map() }
  for (const [index, change] of changes.entries()) {
    const where = `change ${index + 1}, on beat ${change.beat},`
    const wrong = stepRefused(over.held, over.made, reading, change, where, checking)
    if (wrong !== null) return { refused: wrong }
    stepped(over, reading, change)
  }
  return over
}

export function changesRefused(changes: readonly BeatChange[], reading: Reading): string | null {
  const over = heldOver(changes, reading, true)
  return "refused" in over ? over.refused : null
}

export function cachedOf(
  changes: readonly BeatChange[],
  reading: Reading
): readonly Cached[] | Refused {
  const over = heldOver(changes, reading, false)
  if ("refused" in over) return over
  return [...over.held.entries()].map(([page, values]) => {
    const lines = over.lines.get(page)
    return {
      page,
      values: Object.fromEntries(values),
      made: over.made.has(page),
      ...(lines === undefined ? {} : { lines: Object.fromEntries(lines) }),
    }
  })
}

export function mergedOf(
  had: readonly BeatChange[],
  more: readonly BeatChange[]
): readonly BeatChange[] {
  return [...had, ...more].toSorted((one, other) => one.beat - other.beat)
}
