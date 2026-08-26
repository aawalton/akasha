import type { Frontmatter } from "../../frontmatter.ts"
import { NAME_WORD, SLUG_WORD, addressIn } from "../../index/identity/identity.ts"
import { pagesNamed } from "../../index/store/store.ts"
import { pageNameOf } from "../../name/name.ts"
import type { PageAt } from "../../page.ts"
import { blockOf } from "../../text/text.ts"

const PAGE_TYPE = "page-type"

const RULE_SET = "rules-engine-rule-set"

export interface AddressIndex {
  readonly frontmatterOf: (at: PageAt) => Frontmatter | null
  readonly domainAt: (address: string, type?: string) => PageAt | null
  readonly pageTypeNamed: (stem: string) => PageAt | null
}

export function addressIndexIn(
  within: ReadonlySet<string>,
  bodyOf: (at: PageAt) => string | null
): AddressIndex {
  const held = new Map<string, Frontmatter | null>()

  const frontmatterOf = (at: PageAt): Frontmatter | null => {
    const said = `${at.repo}:${at.key}`
    const already = held.get(said)
    if (already !== undefined) return already
    const text = bodyOf(at)
    let made: Frontmatter | null = null
    if (text !== null) {
      const { fm, why } = blockOf(text)
      made = why === null ? fm : null
    }
    held.set(said, made)
    return made
  }

  const lookFor = (word: string, at: string): PageAt | null => {
    const found = pagesNamed(word, at).filter((one) => within.has(one.repo))
    if (found.length !== 1) return null
    const one = found[0]
    if (one === undefined) return null
    const named = pageNameOf(one.key)
    if (named === null) return null
    return { repo: one.repo, key: one.key, stem: named.stem, type: named.type }
  }

  const reached = new Map<string, PageAt | null>()

  const pageOf = (word: string, at: string): PageAt | null => {
    const asked = `${word}/${at}`
    const already = reached.get(asked)
    if (already !== undefined) return already
    const made = lookFor(word, at)
    reached.set(asked, made)
    return made
  }

  const domainAt = (address: string, type?: string): PageAt | null => {
    const at = addressIn(type ?? null, address)
    if (at === null) return null
    return pageOf(SLUG_WORD, at) ?? pageOf(NAME_WORD, at)
  }

  const pageTypeNamed = (stem: string): PageAt | null =>
    pageOf(NAME_WORD, `${PAGE_TYPE}/${stem}`) ?? pageOf(NAME_WORD, `${RULE_SET}/${stem}`)

  return { frontmatterOf, domainAt, pageTypeNamed }
}
