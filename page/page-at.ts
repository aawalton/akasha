import { pageNameSaid } from "./page-name.ts"
import { pagesIn, specFor } from "./pages.ts"
import { blockOf, stringAt, textAt } from "./text.ts"

export type Roots = Readonly<Record<string, string | undefined>>

export type PageAt = {
  readonly repo: string
  readonly key: string
  readonly stem: string
  readonly type: string
}

const SLUG = "slug"

const ID = "id"

const SEQ = "seq"

const ADDRESS_JOIN = "/"

export function saidAt(at: PageAt): string {
  return `${at.repo}:${at.key}`
}

function pagesAcross(roots: Roots, type: string | null): readonly PageAt[] {
  const spec = type === null ? null : specFor(type)
  const found: PageAt[] = []
  for (const [repo, root] of Object.entries(roots)) {
    if (root === undefined) continue
    for (const page of pagesIn(root, spec)) {
      if (type !== null && page.type !== type) continue
      found.push({ repo, key: page.key, stem: page.stem, type: page.type })
    }
  }
  return found
}

function matching(
  roots: Roots,
  type: string | null,
  keeps: (at: PageAt) => boolean
): readonly PageAt[] {
  return pagesAcross(roots, type).filter(keeps)
}

function theOne(found: readonly PageAt[], carried: string): PageAt | null {
  if (found.length === 0) return null
  if (found.length > 1) {
    const said = found.map(saidAt).join(" and ")
    throw new Error(
      `${String(found.length)} pages carry ${carried} — ${said} — so nothing says which one a reference to it reaches`
    )
  }
  return found[0] ?? null
}

function statedAt(roots: Roots, at: PageAt, key: string): string | null {
  const root = roots[at.repo]
  if (root === undefined) return null
  const text = textAt(root, at.key)
  if (text === null) return null
  const { fm, why } = blockOf(text)
  if (why !== null) return null
  return stringAt(fm, key)
}

export function pageByName(roots: Roots, type: string, name: string): PageAt | null {
  const found = matching(roots, type, (at) => at.stem === name)
  return theOne(found, `the name \`${pageNameSaid({ stem: name, type })}\``)
}

export function pageBySlug(roots: Roots, type: string, slug: string): PageAt | null {
  const found = matching(roots, type, (at) => statedAt(roots, at, SLUG) === slug)
  return theOne(found, `the slug \`${slug}\` under the page type \`${type}\``)
}

export function pageByAddress(roots: Roots, address: string): PageAt | null {
  const cut = address.indexOf(ADDRESS_JOIN)
  if (cut <= 0 || cut === address.length - 1) return null
  const slug = address.slice(cut + 1)
  if (slug.includes(ADDRESS_JOIN)) return null
  return pageBySlug(roots, address.slice(0, cut), slug)
}

export function pageById(roots: Roots, id: string): PageAt | null {
  const found = matching(roots, null, (at) => statedAt(roots, at, ID) === id)
  return theOne(found, `the id \`${id}\``)
}

export function pageBySeq(roots: Roots, seq: string): PageAt | null {
  const found = matching(roots, null, (at) => statedAt(roots, at, SEQ) === seq)
  return theOne(found, `the seq \`${seq}\``)
}
