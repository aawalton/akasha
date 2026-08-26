import type { Frontmatter } from "../frontmatter.ts"
import type { PageAt, Roots } from "../page-at.ts"
import { pagesIn } from "../pages.ts"
import { blockOf, NONE, stringAt, textAt } from "../text.ts"

export const BY_ID = "relation-id"

export const BY_SLUG = "relation-slug"

export const BY_NAME = "relation-name"

export const BY_SEQ = "relation-seq"

export const BY_ADDRESS = "relation-address"

const KINDS: readonly string[] = [BY_ADDRESS, BY_SLUG, BY_NAME, BY_SEQ, BY_ID]

const ADDRESS_JOIN = "/"

const ID = "id"

const SLUG = "slug"

const SEQ = "seq"

export function kindOf(stated: string): string | null {
  for (const one of KINDS) {
    if (stated.includes(one)) return one
  }
  return null
}

export type Held = PageAt & {
  readonly fm: Frontmatter
}

export type Identity = {
  readonly pages: readonly Held[]
  readonly at: (kind: string, type: string | null, value: string) => PageAt | null
}

function oneOf(found: readonly PageAt[] | undefined): PageAt | null {
  if (found === undefined || found.length !== 1) return null
  return found[0] ?? null
}

function put(under: Map<string, PageAt[]>, key: string | null, at: PageAt): void {
  if (key === null || key === "" || key === NONE) return
  const held = under.get(key)
  if (held === undefined) under.set(key, [at])
  else held.push(at)
}

export function heldAt(
  repo: string,
  root: string,
  key: string,
  stem: string,
  type: string
): Held | null {
  const text = textAt(root, key)
  if (text === null) return null
  const { fm, why } = blockOf(text)
  if (why !== null) return null
  return { repo, key, stem, type, fm }
}

export function identityOver(roots: Roots): Identity {
  const pages: Held[] = []
  const byId = new Map<string, PageAt[]>()
  const bySlug = new Map<string, PageAt[]>()
  const byName = new Map<string, PageAt[]>()
  const bySeq = new Map<string, PageAt[]>()

  for (const [repo, root] of Object.entries(roots)) {
    if (root === undefined) continue
    for (const page of pagesIn(root)) {
      const at = heldAt(repo, root, page.key, page.stem, page.type)
      if (at === null) continue
      pages.push(at)
      put(byId, stringAt(at.fm, ID), at)
      put(bySlug, `${page.type}/${stringAt(at.fm, SLUG) ?? page.stem}`, at)
      put(byName, `${page.type}/${page.stem}`, at)
      const seq = stringAt(at.fm, SEQ)
      if (seq !== null) put(bySeq, `${page.type}/${seq}`, at)
    }
  }

  const at = (kind: string, type: string | null, value: string): PageAt | null => {
    if (kind === BY_ID) return oneOf(byId.get(value))
    let named = type
    let tail = value
    const cut = value.indexOf(ADDRESS_JOIN)
    if (cut > 0 && !value.slice(cut + 1).includes(ADDRESS_JOIN)) {
      named = value.slice(0, cut)
      tail = value.slice(cut + 1)
    }
    if (named === null) return null
    if (kind === BY_NAME) return oneOf(byName.get(`${named}/${tail}`))
    if (kind === BY_SEQ) return oneOf(bySeq.get(`${named}/${tail}`))
    return oneOf(bySlug.get(`${named}/${tail}`)) ?? oneOf(byName.get(`${named}/${tail}`))
  }

  return { pages, at }
}
