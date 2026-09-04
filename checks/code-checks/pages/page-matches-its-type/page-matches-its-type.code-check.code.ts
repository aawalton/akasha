import { waitingProperties } from "@akasha/indexes/generated-properties"
import type { Change } from "@akasha/pages-system/change"
import { type Formatting, matchingIn } from "@akasha/pages-system/name-format/format-reaching"
import { entriedAmong, entriesIn, type Rows } from "@akasha/pages-system/page-entries"
import { pageNamed } from "@akasha/pages-system/page-file-name"
import { partsOf } from "@akasha/pages-system/page-file-parts"
import type { Carried } from "@akasha/pages-system/page-type-properties"
import { loadedFrom, numberAt, textAt, type Value } from "@akasha/pages-system/page-value"
import type { Shadow } from "@akasha/pages-system/shadow"
import type { Body } from "../../../modules/change-walking/change-walking.module.code.ts"
import {
  bodyOf,
  input,
  PAGES,
  textIn,
} from "../../../modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"

const PAGE_TYPE = "page-type"

const FORMAT = "nameFormatSlug"

const NOTHING: ReadonlySet<string> = new Set()

const ID = "id"

const OWN: ReadonlySet<string> = new Set([ID])

function entriesAt(held: Value, key: string): readonly Value[] {
  const said = held[key]
  if (!Array.isArray(said)) return []
  const kept: Value[] = []
  for (const one of said) {
    if (typeof one === "object" && one !== null && !Array.isArray(one)) {
      kept.push(one as Value)
    }
  }
  return kept
}

function overMax(said: unknown, max: number | null, slug: string, where: string): string | null {
  if (typeof said !== "string" || max === null) return null
  if (said.length <= max) return null
  return `${where}\`${slug}\` runs to ${said.length} characters, over the max of ${max}`
}

function offFormat(
  said: unknown,
  nameFormatSlug: string | null,
  formatting: Formatting,
  slug: string
): string | null {
  if (typeof said !== "string" || nameFormatSlug === null) return null
  if (formatting(nameFormatSlug)(said)) return null
  return `\`${slug}\` is "${said}", which is not written in \`${nameFormatSlug}\``
}

function overTotal(held: readonly unknown[], total: number | null, slug: string): string | null {
  if (total === null) return null
  let sum = 0
  for (const one of held) if (typeof one === "string") sum += one.length
  if (sum <= total) return null
  return `holds ${sum} characters of \`${slug}\`, over the total of ${total}`
}

function twiceIn(held: readonly unknown[], slug: string): string | null {
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
    const max = fieldPage === null ? null : numberAt(fieldPage, "max")
    const format = fieldPage === null ? null : textAt(fieldPage, FORMAT)
    const many = Array.isArray(stated)
    if (shaped.many && many && shaped.max !== null && stated.length > shaped.max) {
      said.push(`holds ${stated.length} of \`${slug} ${field}\`, over the max of ${shaped.max}`)
    }
    if (shaped.many && many) {
      const why = overTotal(stated, shaped.total, `${slug} ${field}`)
      if (why !== null) said.push(why)
      const twice = twiceIn(stated, `${slug} ${field}`)
      if (twice !== null) said.push(twice)
    }
    for (const each of many ? stated : [stated]) {
      const why = overMax(each, max, `${slug} ${field}`, "")
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

export function reasonsIn(
  value: Value,
  declared: readonly Carried[],
  shadow: Shadow,
  named: string,
  formatting: Formatting,
  excused: ReadonlySet<string>
): readonly string[] {
  const said: string[] = []
  const byKey = new Map(declared.map((one): readonly [string, Carried] => [one.key, one]))
  const pageFor = (one: Carried): Value | null =>
    shadow.index.pageAt(one.pageTypeSlug, one.pagePropertySlug)
  for (const one of declared) {
    if (!one.required || one.uncommitted || one.secret) continue
    if (excused.has(one.pagePropertySlug)) continue
    if (!(one.key in value)) {
      said.push(`does not state \`${one.pagePropertySlug}\`, which \`${named}\` requires`)
    }
  }
  for (const [key, held] of Object.entries(value)) {
    const one = byKey.get(key)
    if (one === undefined) {
      said.push(`states \`${key}\`, which \`${named}\` does not declare`)
      continue
    }
    const slug = one.pagePropertySlug
    if (one.uncommitted) {
      said.push(
        `states \`${slug}\`, which \`${named}\` declares uncommitted, and such a value stands beside the page rather than in it`
      )
      continue
    }
    if (one.secret) {
      said.push(
        `states \`${slug}\`, which \`${named}\` declares secret, and such a value stands in the page's sops file rather than in it`
      )
      continue
    }
    const listed = Array.isArray(held)
    if (one.many && !listed)
      said.push(`states \`${slug}\` singly, and \`${named}\` declares it many`)
    if (!one.many && listed)
      said.push(`states \`${slug}\` as a list, and \`${named}\` declares it single`)
    if (one.many && listed && one.max !== null && held.length > one.max) {
      said.push(`holds ${held.length} of \`${slug}\`, over the max of ${one.max}`)
    }
    if (one.many && listed) {
      const why = overTotal(held, one.total, slug)
      if (why !== null) said.push(why)
      const twice = twiceIn(held, slug)
      if (twice !== null) said.push(twice)
    }
    const page = pageFor(one)
    if (page === null) continue
    const max = numberAt(page, "max")
    const format = textAt(page, FORMAT)
    for (const each of listed ? held : [held]) {
      const why = overMax(each, max, slug, "")
      if (why !== null) said.push(why)
      const off = offFormat(each, format, formatting, slug)
      if (off !== null) said.push(off)
    }
    const fields = fieldsFor(page, shadow, slug)
    if (fields.size === 0) continue
    const shaping: Shaping = { fields, slug, pageFor, formatting }
    for (const entry of listed ? entriesAt(value, key) : [held]) {
      if (typeof entry !== "object" || entry === null) continue
      said.push(...fieldsOf(entry as Value, shaping, NOTHING))
    }
  }
  return said
}

export const DECLARES_NO_PAGE =
  "is named as a page and its body declares no page, so what it carries could not be judged"

export const STATES_NO_PAGE_TYPE =
  "states no `page-type-slug`, and what a page carries is read from the page type it states"

export function unloadable(why: string | null): string {
  if (why === null) return DECLARES_NO_PAGE
  return `is named as a page and its body would not load, so what it carries could not be judged — ${why}`
}

function refusalsIn(change: Change, shadow: Shadow): readonly Judged[] {
  const pageTypes = shadow.index.pageTypesIn()
  let generated: ReadonlySet<string> | null = null
  const generatedNow = (): ReadonlySet<string> => {
    if (generated !== null) return generated
    generated = waitingProperties(shadow)
    return generated
  }
  const held = new Map<string, readonly Carried[]>()
  const carriedBy = (pageTypeSlug: string): readonly Carried[] => {
    const found = held.get(pageTypeSlug)
    if (found !== undefined) return found
    // The page names its own type, so this asks about a page type it did not pick and the index
    // may not name — which is the whole shape of the fault this check exists to catch. It takes
    // the tolerant reading and passes over what cannot be read, because a check that throws is a
    // check that does not run, and an index missing a page type is the index's fault rather than
    // this page's.
    const said = shadow.index.propertiesIfNamed(pageTypeSlug) ?? []
    held.set(pageTypeSlug, said)
    return said
  }
  const formatting = matchingIn(change.root, shadow.index, shadow.codeAt)
  const judged: Judged[] = []
  for (const path of change.changed) {
    if (!pageNamed(path, pageTypes)) continue
    const bytes = change.after(path)
    if (bytes === null) continue
    const given: Body = { root: change.root, path, bytes }
    const loaded = loadedFrom(bodyOf(given))
    const value = loaded.value
    if (value === null) {
      judged.push({ path, reason: unloadable(loaded.failed) })
      continue
    }
    const pageTypeSlug = textAt(value, "pageTypeSlug")
    if (pageTypeSlug === null) {
      judged.push({ path, reason: STATES_NO_PAGE_TYPE })
      continue
    }
    const declared = carriedBy(pageTypeSlug)
    if (declared.length === 0) continue
    const named = `${PAGE_TYPE}/${pageTypeSlug}`
    const excused = change.before(path) !== null ? NOTHING : generatedNow()
    for (const reason of reasonsIn(value, declared, shadow, named, formatting, excused)) {
      judged.push({ path, reason })
    }
    const beside = (at: string): string | null => textIn(change, at)
    for (const reason of entryReasonsIn(value, declared, shadow, path, beside, formatting)) {
      judged.push({ path, reason })
    }
  }
  return judged
}

export const pageMatchesItsType = input(PAGES, refusalsIn)
