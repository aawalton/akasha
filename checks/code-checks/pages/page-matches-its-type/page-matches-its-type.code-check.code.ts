import { waitingProperties } from "@akasha/indexes/generated-properties"
import type { Change } from "@akasha/pages/change"
import { type Formatting, matchingIn } from "@akasha/pages/name-format/format-reaching"
import { pageNamed } from "@akasha/pages/page-file-name"
import type { Carried } from "@akasha/pages/page-type-properties"
import { loadedFrom, numberAt, textAt, type Value } from "@akasha/pages/page-value"
import type { Shadow } from "@akasha/pages/shadow"
import type { Body } from "../../../modules/change-walking/change-walking.module.code.ts"
import {
  bodyOf,
  input,
  PAGES,
  textIn,
} from "../../../modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"
import { refusalText } from "../../../modules/refusal-text/refusal-text.module.code.ts"
import {
  entryReasonsIn,
  fieldsFor,
  fieldsOf,
  formatOf,
  offFormat,
  overLength,
  type Shaping,
  twiceIn,
} from "./modules/entry-reasons/entry-reasons.module.code.ts"

const PAGE_TYPE = "page-type"

const COMPUTED = "computed-property"

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

export function computedKey(key: string, on: string): string {
  return refusalText("page-key-computed", { key, on })
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
    if (!one.required || one.uncommitted || one.secret || one.fixed !== undefined) continue
    if (one.pageTypeSlug === COMPUTED) continue
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
    if (one.fixed !== undefined) {
      said.push(
        `states \`${slug}\`, which \`${named}\` fixes as \`${one.fixed}\`, and a fixed value is on no page`
      )
      continue
    }
    if (one.pageTypeSlug === COMPUTED) {
      said.push(computedKey(slug, named))
      continue
    }
    const listed = Array.isArray(held)
    if (one.many && !listed)
      said.push(`states \`${slug}\` singly, and \`${named}\` declares it many`)
    if (!one.many && listed)
      said.push(`states \`${slug}\` as a list, and \`${named}\` declares it single`)
    if (one.many && listed && one.maxCount !== null && held.length > one.maxCount) {
      said.push(`holds ${held.length} of \`${slug}\`, over the count of ${one.maxCount}`)
    }
    if (one.many && listed) {
      const twice = twiceIn(held, slug)
      if (twice !== null) said.push(twice)
    }
    const page = pageFor(one)
    if (page === null) continue
    const max = one.maxLength ?? numberAt(page, "maxLength")
    const format = formatOf(page)
    for (const each of listed ? held : [held]) {
      const why = overLength(each, max, slug, "")
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
    const pageTypeSlug = textAt(value, "type") ?? textAt(value, "pageTypeSlug")
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
