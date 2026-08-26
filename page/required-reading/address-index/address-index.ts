import type { Frontmatter } from "../../frontmatter.ts"
import type { PageAt } from "../../page.ts"
import { blockOf, NONE, stringAt } from "../../text/text.ts"

const PAGE_TYPE = "page-type"

const RULE_SET = "rules-engine-rule-set"

const REGISTRY: readonly string[] = [PAGE_TYPE, RULE_SET]

const SLUG_KEY = "slug"

const EXTENDS_KEY = "extends-slug"

const ADDRESS = /^([a-z0-9-]+)\/([a-z0-9-]+)$/

export function slugPart(value: string | null): string | null {
  if (value === null || value === NONE) return null
  const found = ADDRESS.exec(value)
  return found === null ? value : found[2] ?? null
}

export interface AddressIndex {
  readonly frontmatterOf: (at: PageAt) => Frontmatter | null
  readonly domainAt: (address: string) => PageAt | null
  readonly pageTypeNamed: (stem: string) => PageAt | null
  readonly above: (stem: string) => string | null
}

export function addressIndexOver(
  lending: readonly PageAt[],
  bodyOf: (at: PageAt) => string | null
): AddressIndex {
  const held = new Map<string, Frontmatter | null>()
  const frontmatterOf = (at: PageAt): Frontmatter | null => {
    const key = `${at.repo}:${at.key}`
    const already = held.get(key)
    if (already !== undefined) return already
    const text = bodyOf(at)
    let made: Frontmatter | null = null
    if (text !== null) {
      const { fm, why } = blockOf(text)
      made = why === null ? fm : null
    }
    held.set(key, made)
    return made
  }

  const ordered = [...lending].sort((a, b) => (a.key < b.key ? -1 : a.key > b.key ? 1 : 0))
  const bySlug = new Map<string, PageAt>()
  const byTypedSlug = new Map<string, PageAt>()
  const byStem = new Map<string, PageAt>()
  for (const at of ordered) {
    if (REGISTRY.includes(at.type) && !byStem.has(at.stem)) byStem.set(at.stem, at)
    const fm = frontmatterOf(at)
    if (fm === null) continue
    const slug = stringAt(fm, SLUG_KEY)
    if (slug === null) continue
    if (!bySlug.has(slug)) bySlug.set(slug, at)
    const typed = `${at.type}/${slug}`
    if (!byTypedSlug.has(typed)) byTypedSlug.set(typed, at)
  }

  const domainAt = (address: string): PageAt | null => {
    const typed = byTypedSlug.get(address)
    if (typed !== undefined) return typed
    const direct = bySlug.get(address)
    if (direct !== undefined) return direct
    const part = slugPart(address)
    return part === null ? null : bySlug.get(part) ?? null
  }

  const pageTypeNamed = (stem: string): PageAt | null => byStem.get(stem) ?? null

  return {
    frontmatterOf,
    domainAt,
    pageTypeNamed,
    above: (stem) => {
      const at = pageTypeNamed(stem)
      if (at === null) return null
      const fm = frontmatterOf(at)
      return fm === null ? null : stringAt(fm, EXTENDS_KEY)
    },
  }
}
