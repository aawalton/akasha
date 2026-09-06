import type { Formatting } from "@akasha/pages/name-format/format-reaching"
import { entriedAmong, entriesIn, type Rows } from "@akasha/pages/page-entries"
import { partsOf } from "@akasha/pages/page-file-parts"
import type { Carried } from "@akasha/pages/page-type-properties"
import { numberAt, textAt, type Value } from "@akasha/pages/page-value"
import type { Shadow } from "@akasha/pages/shadow"

export const FORMAT = "nameFormatSlug"

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

export type Shaping = {
  readonly fields: ReadonlyMap<string, Carried>
  readonly slug: string
  readonly pageFor: (one: Carried) => Value | null
  readonly formatting: Formatting
}

export function fieldsFor(page: Value, shadow: Shadow, slug: string): ReadonlyMap<string, Carried> {
  const found = new Map<string, Carried>()
  for (const each of shadow.index.carriedIn(page, slug)) found.set(each.key, each)
  return found
}

export function fieldsOf(
  entry: Value,
  shaping: Shaping,
  unjudged: ReadonlySet<string>
): readonly string[] {
  const said: string[] = []
  const { fields, slug, pageFor, formatting } = shaping
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
    const format = fieldPage === null ? null : textAt(fieldPage, FORMAT)
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
    for (const each of many ? stated : [stated]) {
      const why = overLength(each, max, `${slug} ${field}`, "")
      if (why !== null) said.push(why)
      const off = offFormat(each, format, formatting, `${slug} ${field}`)
      if (off !== null) said.push(off)
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
    const shaping: Shaping = { fields, slug, pageFor, formatting }
    for (const entry of read.entries) {
      if (typeof entry[ID] !== "string") {
        said.push(`keeps an entry of \`${slug}\` carrying no id, and every entry carries an id`)
      }
      said.push(...fieldsOf(entry, shaping, OWN))
    }
  }
  return said
}
