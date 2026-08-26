import type { Frontmatter } from "./frontmatter.ts"
import { blockOf, stringAt } from "./text.ts"

const DIACRITICS = /[̀-ͯ]/g

const APOSTROPHES = /['’]/g

const NOT_ALPHANUMERIC = /[^A-Za-z0-9]+/g

const EDGE_DASHES = /^-+|-+$/g

const HOLE = /\{([a-z0-9-]+)\}/g

export const STEM_CEILING = 71

export const NAMED_FOR = "named-for"

export const EXTENDS_SLUG = "extends-slug"

const NONE = "none"

export function pageStem(text: string): string {
  const stem = text
    .normalize("NFKD")
    .replace(DIACRITICS, "")
    .replace(APOSTROPHES, "")
    .replace(NOT_ALPHANUMERIC, "-")
    .replace(EDGE_DASHES, "")
    .toLowerCase()
  return stem.length <= STEM_CEILING ? stem : stem.slice(0, STEM_CEILING).replace(EDGE_DASHES, "")
}

export type PageTypeNaming = {
  readonly namedFor: string | null
  readonly above: string | null
}

function slugPart(named: string | null): string | null {
  if (named === null || named === NONE) return null
  const cut = named.indexOf("/")
  return cut < 0 ? named : named.slice(cut + 1)
}

export function namingOf(text: string): PageTypeNaming | null {
  const { fm, why } = blockOf(text)
  if (why !== null) return null
  return { namedFor: stringAt(fm, NAMED_FOR), above: slugPart(stringAt(fm, EXTENDS_SLUG)) }
}

export function ruleFor(
  naming: ReadonlyMap<string, PageTypeNaming>,
  type: string
): string | null {
  const walked = new Set<string>()
  let at: string | null = type
  while (at !== null && !walked.has(at)) {
    walked.add(at)
    const held = naming.get(at)
    if (held === undefined) return null
    if (held.namedFor !== null) return held.namedFor
    at = held.above
  }
  return null
}

export function filled(rule: string, fm: Frontmatter): string | null {
  let whole = ""
  let at = 0
  let unfilled = false
  for (const found of rule.matchAll(HOLE)) {
    const key = found[1]
    if (key === undefined) continue
    const held = stringAt(fm, key)
    if (held === null) {
      unfilled = true
      break
    }
    whole += rule.slice(at, found.index) + held
    at = found.index + found[0].length
  }
  if (unfilled) return null
  return pageStem(whole + rule.slice(at))
}

export type Named = {
  readonly name: string
  readonly via: string
}

export function nameOf(rule: string | null, fm: Frontmatter): Named | null {
  if (rule !== null) {
    const held = filled(rule, fm)
    if (held !== null) return { name: held, via: NAMED_FOR }
  }
  const slug = stringAt(fm, "slug")
  if (slug !== null) return { name: slug, via: "slug" }
  const title = stringAt(fm, "title")
  if (title !== null) return { name: pageStem(title), via: "title" }
  const id = stringAt(fm, "id")
  if (id !== null) return { name: id, via: "id" }
  return null
}
