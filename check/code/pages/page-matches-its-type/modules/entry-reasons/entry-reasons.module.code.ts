import type { Paged } from "akasha/check/modules/audit-commit/audit-commit.module.code.ts"
import { ENTRY_PROPERTY } from "akasha/page/index/modules/entries/index-entries.module.code.ts"
import { addressIn } from "akasha/page/modules/address/page-address.module.code.ts"
import { entriesIn } from "akasha/page/modules/entries/page-entries.module.code.ts"
import { partsReading } from "akasha/page/modules/file-parts/page-file-parts.module.code.ts"
import {
  numberAt,
  textAt,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import type { Formatting } from "akasha/page/name-format/modules/format-reaching/format-reaching.module.code.ts"
import type { Carried } from "akasha/page/type/modules/declared-properties/declared-properties.module.code.ts"

const FORMAT = "nameFormat"

export function formatOf(page: Value): string | null {
  return textAt(page, FORMAT)
}

const ID = "id"

const OWN: ReadonlySet<string> = new Set([ID])

export function overLength(
  said: unknown,
  length: number | null,
  slug: string,
  where: string
): string | null {
  if (typeof said !== "string" || length === null) return null
  if (said.length <= length) return null
  return `${where}\`${slug}\` runs to ${said.length} characters, over the length of ${length}`
}

export function offFormat(
  said: unknown,
  nameFormatSlug: string | null,
  formatting: Formatting,
  slug: string
): string | null {
  if (typeof said !== "string" || nameFormatSlug === null) return null
  if (formatting(nameFormatSlug)(said)) return null
  return `\`${slug}\` is "${said}", which is not written in \`${nameFormatSlug}\``
}

export function twiceIn(held: readonly unknown[], slug: string): string | null {
  const seen = new Set<string>()
  for (const one of held) {
    const key = typeof one === "string" ? one : JSON.stringify(one)
    if (typeof key !== "string") continue
    if (seen.has(key)) {
      const said = typeof one === "string" ? `"${one}"` : "an entry"
      return `repeats ${said} in \`${slug}\`, and a list carries each value once`
    }
    seen.add(key)
  }
  return null
}

export type Opened = {
  readonly among: readonly ReadonlyMap<string, Carried>[]
  readonly fields: ReadonlyMap<string, Carried>
  readonly plain: boolean
}

export type Fielding = (one: Carried) => Opened

export type Shaping = {
  readonly fields: ReadonlyMap<string, Carried>
  readonly slug: string
  readonly pageFor: (one: Carried) => Value | null
  readonly formatting: Formatting
  readonly fieldsIn: Fielding
}

function fieldsFor(page: Value, paged: Paged, slug: string): ReadonlyMap<string, Carried> {
  const found = new Map<string, Carried>()
  for (const each of paged.index.carriedIn(page, slug)) found.set(each.key, each)
  return found
}

const NO_FIELDS: ReadonlyMap<string, Carried> = new Map()

const NOTHING: ReadonlySet<string> = new Set()

const ONE_OF = "one-of-property"

const MEMBERS = "members"

export const COMPUTED = "computed-property"

export const NOTHING_OPENED: Opened = { among: [], fields: NO_FIELDS, plain: true }

const ENTRIED = new WeakMap<Paged, ReadonlySet<string>>()

function entriedIn(paged: Paged): ReadonlySet<string> {
  const found = ENTRIED.get(paged)
  if (found !== undefined) return found
  const made = paged.index.kindsUnder(ENTRY_PROPERTY)
  ENTRIED.set(paged, made)
  return made
}

function memberNamesIn(page: Value): readonly string[] {
  const said = page[MEMBERS]
  if (!Array.isArray(said)) return []
  return said.filter((one): one is string => typeof one === "string")
}

export function openedAmong(page: Value, paged: Paged): Opened {
  const among: ReadonlyMap<string, Carried>[] = []
  let plain = false
  for (const named of memberNamesIn(page)) {
    const address = addressIn(named)
    if (address.kind !== "qualified") continue
    const member = paged.index.pageAt(address.pageTypeSlug, address.slug)
    const said = member === null ? NO_FIELDS : fieldsFor(member, paged, address.slug)
    if (said.size === 0) plain = true
    else among.push(said)
  }
  const one = among[0]
  if (one === undefined) return NOTHING_OPENED
  if (among.length === 1) return { among: [], fields: one, plain }
  return { among, fields: NO_FIELDS, plain }
}

function fitsIn(fields: ReadonlyMap<string, Carried>, entry: Value): boolean {
  for (const key of Object.keys(entry)) {
    if (!fields.has(key)) return false
  }
  for (const [key, shaped] of fields) {
    if (!shaped.required || shaped.uncommitted || shaped.secret) continue
    if (shaped.fixed !== undefined || shaped.pageTypeSlug === COMPUTED) continue
    if (!(key in entry)) return false
  }
  return true
}

export function fittingIn(
  opened: Opened,
  shaped: ReadonlyMap<string, Carried>,
  entry: Value
): ReadonlyMap<string, Carried> | null {
  if (opened.among.length === 0) return shaped
  const fitting = opened.among.filter((fields) => fitsIn(fields, entry))
  const one = fitting[0]
  return fitting.length === 1 && one !== undefined ? one : null
}

export function noMemberIn(slug: string): string {
  return (
    `\`${slug}\` holds a record fitting no one member, and such a record is judged ` +
    `against the one member whose fields that record fits`
  )
}

export function fieldsReading(paged: Paged, pageFor: (one: Carried) => Value | null): Fielding {
  const entried = entriedIn(paged)
  return (one) => {
    if (entried.has(one.pageTypeSlug)) return NOTHING_OPENED
    const page = pageFor(one)
    if (page === null) return NOTHING_OPENED
    if (one.pageTypeSlug === ONE_OF) return openedAmong(page, paged)
    const fields = fieldsFor(page, paged, one.pagePropertySlug)
    return fields.size === 0 ? NOTHING_OPENED : { among: [], fields, plain: false }
  }
}

export function noRecordIn(said: unknown, slug: string): string {
  const held = typeof said === "string" ? `"${said}"` : JSON.stringify(said)
  const spelled = held ?? String(said)
  return `\`${slug}\` is ${spelled}, and a value whose property declares fields is a record`
}

export function groupedFor(
  one: Carried,
  held: unknown,
  paged: Paged
): ReadonlyMap<string, Carried> {
  if (typeof held !== "object" || held === null || Array.isArray(held)) return NO_FIELDS
  const members = paged.index.membersIfNamed(one.pageTypeSlug)
  if (members === null) return NO_FIELDS
  const filed = paged.index.fileKeysAt()
  const found = new Map<string, Carried>()
  for (const each of members) {
    if (filed.has(each.propertySlug)) continue
    found.set(each.key, each)
  }
  return found
}

export function fieldsOf(
  entry: Value,
  shaping: Shaping,
  unjudged: ReadonlySet<string>
): readonly string[] {
  const said: string[] = []
  const { fields, slug, pageFor, formatting, fieldsIn } = shaping
  for (const [key, shaped] of fields) {
    if (unjudged.has(key)) continue
    if (!shaped.required || shaped.uncommitted || shaped.secret) continue
    if (shaped.fixed !== undefined) continue
    if (shaped.pageTypeSlug === COMPUTED) continue
    if (key in entry) continue
    const field = shaped.pagePropertySlug
    said.push(`does not state \`${slug} ${field}\`, which \`${slug}\` requires`)
  }
  for (const [inner, stated] of Object.entries(entry)) {
    if (unjudged.has(inner)) continue
    const shaped = fields.get(inner)
    if (shaped === undefined) {
      said.push(`states \`${slug} ${inner}\`, which \`${slug}\` does not declare`)
      continue
    }
    const field = shaped.pagePropertySlug
    const fieldPage = pageFor(shaped)
    const stood = fieldPage === null ? null : numberAt(fieldPage, "maxLength")
    const max = shaped.maxLength ?? stood
    const format = fieldPage === null ? null : formatOf(fieldPage)
    const many = Array.isArray(stated)
    if (shaped.many && many && shaped.maxCount !== null && stated.length > shaped.maxCount) {
      said.push(
        `holds ${stated.length} of \`${slug} ${field}\`, over the count of ${shaped.maxCount}`
      )
    }
    if (shaped.many && many) {
      const twice = twiceIn(stated, `${slug} ${field}`)
      if (twice !== null) said.push(twice)
    }
    const inside = fieldsIn(shaped)
    for (const each of many ? stated : [stated]) {
      const why = overLength(each, max, `${slug} ${field}`, "")
      if (why !== null) said.push(why)
      const off = offFormat(each, format, formatting, `${slug} ${field}`)
      if (off !== null) said.push(off)
      if (inside.fields.size === 0 && inside.among.length === 0) continue
      if (typeof each !== "object" || each === null || Array.isArray(each)) {
        if (!inside.plain) said.push(noRecordIn(each, `${slug} ${field}`))
        continue
      }
      const fitting = fittingIn(inside, inside.fields, each as Value)
      if (fitting === null) {
        said.push(noMemberIn(`${slug} ${field}`))
        continue
      }
      const within: Shaping = { ...shaping, fields: fitting, slug: field }
      said.push(...fieldsOf(each as Value, within, NOTHING))
    }
  }
  return said
}

function entryShapingFor(
  one: Carried,
  paged: Paged,
  pageFor: (each: Carried) => Value | null,
  formatting: Formatting,
  fieldsIn: Fielding
): Shaping | null {
  const page = pageFor(one)
  if (page === null) return null
  const slug = one.pagePropertySlug
  const fields = fieldsFor(page, paged, slug)
  if (fields.size === 0) return null
  return { fields, slug, pageFor, formatting, fieldsIn }
}

function rowsJudged(rows: readonly Value[], shaping: Shaping, said: string[]): undefined {
  const slug = shaping.slug
  for (const entry of rows) {
    if (typeof entry[ID] !== "string") {
      said.push(`keeps an entry of \`${slug}\` carrying no id, and every entry carries an id`)
    }
    for (const reason of fieldsOf(entry, shaping, OWN)) said.push(reason)
  }
}

export function entryReasonsIn(
  value: Value,
  declared: readonly Carried[],
  paged: Paged,
  path: string,
  beside: (at: string) => string | null,
  formatting: Formatting
): readonly string[] {
  const said: string[] = []
  const pageFor = (one: Carried): Value | null =>
    paged.index.pageAt(one.pageTypeSlug, one.pagePropertySlug)
  const fieldsIn = fieldsReading(paged, pageFor)
  const entried = entriedIn(paged)
  for (const one of declared) {
    if (!entried.has(one.pageTypeSlug)) continue
    const held = value[one.key]
    if (typeof held !== "string") continue
    const shaping = entryShapingFor(one, paged, pageFor, formatting, fieldsIn)
    const found: string[] = []
    let refused: string | null = null
    for (const [at, text] of partsReading(path, one.propertySlug, held, beside)) {
      const read = entriesIn(at, text)
      if ("refused" in read) {
        refused = read.refused
        break
      }
      if (shaping === null) continue
      rowsJudged(read.entries, shaping, found)
    }
    if (refused !== null) {
      said.push(refused)
      continue
    }
    for (const reason of found) said.push(reason)
  }
  return said
}
