import {
  entriedAmong,
  entriesIn,
  type Rows,
} from "akasha/pages/entries/page-entries.module.code.ts"
import { partsOf } from "akasha/pages/file-parts/page-file-parts.module.code.ts"
import type { Formatting } from "akasha/pages/name-formats/modules/format-reaching/format-reaching.module.code.ts"
import type { Shadow } from "akasha/pages/shadow/shadow.module.code.ts"
import type { Carried } from "akasha/pages/types/declared-properties/declared-properties.module.code.ts"
import {
  numberAt,
  textAt,
  type Value,
} from "akasha/pages/value-reading/page-value-reading.module.code.ts"

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

export type Fielding = (one: Carried) => ReadonlyMap<string, Carried>

export type Shaping = {
  readonly fields: ReadonlyMap<string, Carried>
  readonly slug: string
  readonly pageFor: (one: Carried) => Value | null
  readonly formatting: Formatting
  readonly fieldsIn: Fielding
}

export function fieldsFor(page: Value, shadow: Shadow, slug: string): ReadonlyMap<string, Carried> {
  const found = new Map<string, Carried>()
  for (const each of shadow.index.carriedIn(page, slug)) found.set(each.key, each)
  return found
}

const NO_FIELDS: ReadonlyMap<string, Carried> = new Map()

const NOTHING: ReadonlySet<string> = new Set()

export function fieldsReading(shadow: Shadow, pageFor: (one: Carried) => Value | null): Fielding {
  return (one) => {
    const page = pageFor(one)
    return page === null ? NO_FIELDS : fieldsFor(page, shadow, one.pagePropertySlug)
  }
}

export function recordFieldsIn(one: Carried, fieldsIn: Fielding): ReadonlyMap<string, Carried> {
  return entriedAmong([one]).length > 0 ? NO_FIELDS : fieldsIn(one)
}

export function noRecordIn(said: unknown, slug: string): string {
  const held = typeof said === "string" ? `"${said}"` : JSON.stringify(said)
  const spelled = held ?? String(said)
  return `\`${slug}\` is ${spelled}, and a value whose property declares fields is a record`
}

export function groupedFor(
  one: Carried,
  held: unknown,
  shadow: Shadow
): ReadonlyMap<string, Carried> {
  if (typeof held !== "object" || held === null || Array.isArray(held)) return NO_FIELDS
  const members = shadow.index.membersIfNamed(one.pageTypeSlug)
  if (members === null) return NO_FIELDS
  const filed = shadow.index.fileKeysAt()
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
    const inside = recordFieldsIn(shaped, fieldsIn)
    for (const each of many ? stated : [stated]) {
      const why = overLength(each, max, `${slug} ${field}`, "")
      if (why !== null) said.push(why)
      const off = offFormat(each, format, formatting, `${slug} ${field}`)
      if (off !== null) said.push(off)
      if (inside.size === 0) continue
      if (typeof each !== "object" || each === null || Array.isArray(each)) {
        said.push(noRecordIn(each, `${slug} ${field}`))
        continue
      }
      const within: Shaping = { ...shaping, fields: inside, slug: field }
      said.push(...fieldsOf(each as Value, within, NOTHING))
    }
  }
  return said
}

export function entriesOver(
  path: string,
  propertySlug: string,
  held: string,
  beside: (at: string) => string | null
): Rows {
  const found: Value[] = []
  for (const at of partsOf(path, propertySlug, held, (one) => beside(one) !== null)) {
    const text = beside(at)
    if (text === null) continue
    const read = entriesIn(at, text)
    if ("refused" in read) return read
    found.push(...read.entries)
  }
  return { entries: found }
}

export function entryReasonsIn(
  value: Value,
  declared: readonly Carried[],
  shadow: Shadow,
  path: string,
  beside: (at: string) => string | null,
  formatting: Formatting
): readonly string[] {
  const said: string[] = []
  const pageFor = (one: Carried): Value | null =>
    shadow.index.pageAt(one.pageTypeSlug, one.pagePropertySlug)
  const fieldsIn = fieldsReading(shadow, pageFor)
  for (const one of entriedAmong(declared)) {
    const held = value[one.key]
    if (typeof held !== "string") continue
    const read = entriesOver(path, one.propertySlug, held, beside)
    if ("refused" in read) {
      said.push(read.refused)
      continue
    }
    const page = pageFor(one)
    if (page === null) continue
    const slug = one.pagePropertySlug
    const fields = fieldsFor(page, shadow, slug)
    if (fields.size === 0) continue
    const shaping: Shaping = { fields, slug, pageFor, formatting, fieldsIn }
    for (const entry of read.entries) {
      if (typeof entry[ID] !== "string") {
        said.push(`keeps an entry of \`${slug}\` carrying no id, and every entry carries an id`)
      }
      said.push(...fieldsOf(entry, shaping, OWN))
    }
  }
  return said
}
