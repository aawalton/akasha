import { addPropertyValue as addPropertyValueMechanical } from "akasha/change/mechanical/file-content/add/add-property-value/add-property-value.change-mechanical-file-content.ts"
import { changeMechanicalFileContent } from "akasha/change/mechanical/file-content/change-mechanical-file-content.page-type.ts"
import {
  type Answer,
  gathered,
  missing,
  refusing,
} from "akasha/change/modules/answer/change-answer.module.code.ts"
import {
  addressedIn,
  addressedUnder,
  afterIn,
  declaresIn,
  holdsIn,
  listFieldIn,
  type Read as PageRead,
  readFor,
  singleIn,
  spelledIn,
  typeIn,
} from "akasha/change/modules/page-knowing/page-knowing.module.code.ts"
import { reach, type World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const ADD_PROPERTY_VALUE =
  `${changeMechanicalFileContent.slug}/${addPropertyValueMechanical.slug}` as const

const ADDED = "added"

const AFTER = "after"

const WHERE = "where"

const IS = "is"

const FIELD = "field"

const LINE = /^(\S+)\s+(\S+)\s+(.+)$/

const PARTED = "is no path, key and value parted by spaces"

const NO_LINE = "no line was handed in, so no value is put in"

const TOGETHER = "`where`, `is` and `field` are stated together or not at all, so nothing is put in"

const PLACED = "`after` places a key rather than a value inside a record, so nothing is put in"

const INSIDE =
  "A list field inside a record is reached with `where`, `is` and `field` under the record's key."

export type Line = {
  readonly at: string
  readonly key: string
  readonly value: string
}

export type Read = { readonly lines: readonly Line[] } | { readonly refused: string }

export function readIn(said: string): Read {
  const lines: Line[] = []
  for (const line of said.split("\n")) {
    const one = line.trim()
    if (one === "") continue
    const found = LINE.exec(one)
    const at = found?.[1]
    const key = found?.[2]
    const value = found?.[3]
    if (at === undefined || key === undefined || value === undefined) {
      return { refused: `\`${one}\` ${PARTED}` }
    }
    lines.push({ at, key, value })
  }
  return { lines }
}

type InRecord = {
  readonly where: string
  readonly is: string
  readonly field: string
}

type Whole = {
  readonly after: string | null
  readonly record: InRecord | null
}

type Handed = { readonly asked: object } | { readonly refused: string }

type Known = Extract<PageRead, { readonly known: unknown }>

function undeclared(world: World, value: Value, key: string): string | null {
  const stated = typeIn(value)
  if (stated === null || declaresIn(world, value, key) !== false) return null
  const named = spelledIn(world, value, key)
  if (named !== null) {
    return (
      `\`${key}\` is a slug, and \`${stated}\` declares that property under the key ` +
      `\`${named}\`, so nothing is put in. Name the key.`
    )
  }
  return `\`${key}\` is no property \`${stated}\` declares, so nothing is put in. ${INSIDE}`
}

function inRecord(world: World, read: Known, one: Line, record: InRecord): Handed {
  const field = listFieldIn(world, read.known, read.value, one.key, record.field)
  if ("refused" in field) return { refused: `${field.refused}, so nothing is put in` }
  const addressed = addressedUnder(read.known, field.propertySlug, record.field, one.value)
  if ("refused" in addressed) return addressed
  const valued = { ...one, ...record, value: addressed.value }
  return { asked: field.holds === null ? valued : { ...valued, holds: field.holds } }
}

function handedFor(world: World, one: Line, whole: Whole): Handed {
  const read = readFor(world, one.at)
  if ("refused" in read) return read
  const refused = undeclared(world, read.value, one.key)
  if (refused !== null) return { refused }
  if (whole.record !== null) return inRecord(world, read, one, whole.record)
  const addressed = addressedIn(read.known, read.value, one.key, one.value)
  if ("refused" in addressed) return addressed
  const single = singleIn(world, read.value, one.key)
  const holds = holdsIn(world, read.value, one.key)
  const placed = whole.after ?? afterIn(world, read.value, one.key)
  const valued = { ...one, value: addressed.value }
  const told = single ? { ...valued, single } : valued
  const spelled = holds === null ? told : { ...told, holds }
  return { asked: placed === null ? spelled : { ...spelled, after: placed } }
}

function lineOf(one: Line, why: string): string {
  const ended = why.endsWith(".") ? why : `${why}.`
  return `${ended} \`${one.at} ${one.key} ${one.value}\` is the line, and no value here is put in`
}

const NOTHING_WHOLE: Whole = { after: null, record: null }

export async function addPropertyValues(
  world: World,
  lines: readonly Line[],
  whole: Whole = NOTHING_WHOLE
): Promise<Answer> {
  const put: Answer[] = []
  let seen = world
  for (const one of lines) {
    const handed = handedFor(seen, one, whole)
    if ("refused" in handed) return refusing(lineOf(one, handed.refused))
    const reached = await reach(seen, ADD_PROPERTY_VALUE, handed.asked)
    const why = reached.said.refused
    if (why !== null) return refusing(lineOf(one, why))
    put.push(reached.said)
    seen = reached.world
  }
  return gathered(put)
}

export type Asked = Readonly<Record<string, string>>

export const takes: readonly string[] = [ADDED, AFTER, WHERE, IS, FIELD]

function wholeIn(given: Asked): Whole | { readonly refused: string } {
  const where = given[WHERE]
  const is = given[IS]
  const field = given[FIELD]
  const after = given[AFTER] ?? null
  if (where === undefined && is === undefined && field === undefined) {
    return { after, record: null }
  }
  if (where === undefined || is === undefined || field === undefined) return { refused: TOGETHER }
  if (after !== null) return { refused: PLACED }
  return { after, record: { where, is, field } }
}

export async function runChange(world: World, given: Asked): Promise<Answer> {
  const body = given[ADDED]
  if (body === undefined) return refusing(missing(ADDED))
  const whole = wholeIn(given)
  if ("refused" in whole) return refusing(whole.refused)
  const read = readIn(body)
  if ("refused" in read) return refusing(read.refused)
  if (read.lines.length === 0) return refusing(NO_LINE)
  return await addPropertyValues(world, read.lines, whole)
}
