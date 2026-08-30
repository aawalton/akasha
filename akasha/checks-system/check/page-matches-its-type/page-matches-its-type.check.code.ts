import type { Change } from "../../../pages-system/change/change.module.code.ts"
import { waitingProperties } from "../../../pages-system/indexes/generated-properties/generated-properties.module.code.ts"
import {
  loadedFrom,
  numberAt,
  pageTypesIn,
  textAt,
  type Value,
} from "../../../pages-system/indexes/index-entries/index-entries.module.code.ts"
import {
  type Formatting,
  matchingIn,
} from "../../../pages-system/name-format/format-reaching/format-reaching.module.code.ts"
import { pageNamed } from "../../../pages-system/page/page-file-name/page-file-name.module.code.ts"
import {
  type Carried,
  carriedIn,
  pageAt,
  propertiesOf,
} from "../../../pages-system/page-type/page-type-properties/page-type-properties.module.code.ts"
import type { Shadow } from "../../../pages-system/shadow/shadow.module.code.ts"
import type { Body } from "../../checking/checking.module.code.ts"
import { bodyOf } from "../../checking/checking.module.code.ts"
import type { Judged } from "../../judging/judging.module.code.ts"

const INSIDE = "akasha/"

const PAGE_TYPE = "page-type"

const TEXT = "text-property"

const RECORD = "record-property"

const FORMAT = "nameFormatSlug"

const NOTHING: ReadonlySet<string> = new Set()

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
    pageAt(shadow.reading, one.pageTypeSlug, one.pagePropertySlug, shadow.pageOf)
  for (const one of declared) {
    if (!one.required || one.uncommitted || excused.has(one.pagePropertySlug)) continue
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
    const shape = textAt(page, "pageTypeSlug")
    if (shape === TEXT) {
      const max = numberAt(page, "max")
      const format = textAt(page, FORMAT)
      for (const each of listed ? held : [held]) {
        const why = overMax(each, max, slug, "")
        if (why !== null) said.push(why)
        const off = offFormat(each, format, formatting, slug)
        if (off !== null) said.push(off)
      }
      continue
    }
    if (shape !== RECORD) continue
    const fields = new Map<string, Carried>()
    for (const each of carriedIn(page, shadow.reading, slug)) fields.set(each.key, each)
    for (const entry of listed ? entriesAt(value, key) : [held]) {
      if (typeof entry !== "object" || entry === null) continue
      for (const [inner, value_] of Object.entries(entry as Value)) {
        const shaped = fields.get(inner)
        if (shaped === undefined) {
          said.push(`states \`${slug} ${inner}\`, which \`${slug}\` does not declare`)
          continue
        }
        const field = shaped.pagePropertySlug
        const held_ = pageFor(shaped)
        const max = held_ === null ? null : numberAt(held_, "max")
        const format = held_ === null ? null : textAt(held_, FORMAT)
        const many = Array.isArray(value_)
        if (shaped.many && many && shaped.max !== null && value_.length > shaped.max) {
          said.push(`holds ${value_.length} of \`${slug} ${field}\`, over the max of ${shaped.max}`)
        }
        if (shaped.many && many) {
          const why = overTotal(value_, shaped.total, `${slug} ${field}`)
          if (why !== null) said.push(why)
          const twice = twiceIn(value_, `${slug} ${field}`)
          if (twice !== null) said.push(twice)
        }
        for (const each of many ? value_ : [value_]) {
          const why = overMax(each, max, `${slug} ${field}`, "")
          if (why !== null) said.push(why)
          const off = offFormat(each, format, formatting, `${slug} ${field}`)
          if (off !== null) said.push(off)
        }
      }
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

export function pageMatchesItsType(change: Change, shadow: Shadow): readonly Judged[] {
  const pageTypes = pageTypesIn(shadow.reading)
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
    const said = propertiesOf(pageTypeSlug, shadow.reading, shadow.pageOf)
    held.set(pageTypeSlug, said)
    return said
  }
  const formatting = matchingIn(change.root)
  const judged: Judged[] = []
  for (const path of change.changed) {
    if (!path.startsWith(INSIDE)) continue
    if (!pageNamed(path, pageTypes)) continue
    const bytes = change.after(path)
    if (bytes === null) continue
    const given: Body = { root: change.root, path, bytes }
    const text = bodyOf(given)
    if (text === null) continue
    const loaded = loadedFrom(text)
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
  }
  return judged
}
