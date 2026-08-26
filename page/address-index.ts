import type { Frontmatter } from "./frontmatter.ts"
import type { PageAt } from "./page-at.ts"
import { blockOf, NONE, stringAt } from "./text.ts"

const PAGE_TYPE = "page-type"

const EXTENDS_KEY = "extends-slug"

const ADDRESS = /^([a-z0-9-]+)\/([a-z0-9-]+)$/

export function addressOf(type: string, slug: string): string {
  return `${type}/${slug}`
}

export function slugPart(value: string | null): string | null {
  if (value === null || value === NONE) return null
  const found = ADDRESS.exec(value)
  return found === null ? value : found[2] ?? null
}

export interface AddressIndex {
  readonly frontmatterOf: (at: PageAt) => Frontmatter | null
  readonly atAddress: (address: string) => PageAt | null
  readonly above: (pageTypeSlug: string) => string | null
}

export function addressIndexOver(
  pages: Iterable<PageAt>,
  bodyOf: (at: PageAt) => string | null
): AddressIndex {
  const byAddress = new Map<string, PageAt>()
  for (const at of pages) byAddress.set(addressOf(at.type, at.stem), at)

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

  const atAddress = (address: string): PageAt | null => byAddress.get(address) ?? null

  return {
    frontmatterOf,
    atAddress,
    above: (pageTypeSlug) => {
      const at = atAddress(addressOf(PAGE_TYPE, pageTypeSlug))
      if (at === null) return null
      const fm = frontmatterOf(at)
      return fm === null ? null : slugPart(stringAt(fm, EXTENDS_KEY))
    },
  }
}
