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

export type Stated = PageAt & {
  readonly id: string | null
  readonly slug: string | null
  readonly seq: string | null
}

export type Resolve = (kind: string, type: string | null, value: string) => PageAt | null

export type Identity = {
  readonly pages: readonly Held[]
  readonly at: Resolve
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

export function statedOf(at: Held): Stated {
  return {
    repo: at.repo,
    key: at.key,
    stem: at.stem,
    type: at.type,
    id: stringAt(at.fm, ID),
    slug: stringAt(at.fm, SLUG),
    seq: stringAt(at.fm, SEQ),
  }
}

export function resolveOver(stated: Iterable<Stated>): Resolve {
  const byId = new Map<string, PageAt[]>()
  const bySlug = new Map<string, PageAt[]>()
  const byName = new Map<string, PageAt[]>()
  const bySeq = new Map<string, PageAt[]>()
  for (const one of stated) {
    const at: PageAt = { repo: one.repo, key: one.key, stem: one.stem, type: one.type }
    put(byId, one.id, at)
    put(bySlug, `${one.type}/${one.slug ?? one.stem}`, at)
    put(byName, `${one.type}/${one.stem}`, at)
    if (one.seq !== null) put(bySeq, `${one.type}/${one.seq}`, at)
  }
  return (kind, type, value) => {
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
}

export function identityOver(roots: Roots): Identity {
  const pages: Held[] = []
  for (const [repo, root] of Object.entries(roots)) {
    if (root === undefined) continue
    for (const page of pagesIn(root)) {
      const at = heldAt(repo, root, page.key, page.stem, page.type)
      if (at === null) continue
      pages.push(at)
    }
  }
  return { pages, at: resolveOver(pages.map(statedOf)) }
}
