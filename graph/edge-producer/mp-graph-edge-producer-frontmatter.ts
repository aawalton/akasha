import { type Frontmatter, listField } from "../../../instructions/tools/page/frontmatter.ts"
import { blockOf, NONE, textAt } from "../../../instructions/tools/page/page-types.ts"
import type { BuildContext, NodeRef, PageNode } from "../node-producer/mp-graph-node-producer-page.ts"

const SHARED_REPO = "instructions"

export type EdgeInit = {
  readonly kind: string
  readonly from: NodeRef
  readonly to: NodeRef
}

export type EdgeProducer = {
  readonly name: string
  readonly edgeKinds: readonly string[]
  readonly build: (ctx: BuildContext, pages: readonly PageNode[]) => readonly EdgeInit[]
}

export type Reference = {
  readonly key: string
  readonly kind: string
  readonly fromPageType: string | null
  readonly toPageType: string | null
}

export const REFERENCES: readonly Reference[] = [
  { key: "page-type-slug", kind: "page-type", fromPageType: null, toPageType: "page-type" },
  { key: "extends-slug", kind: "extends", fromPageType: "page-type", toPageType: "page-type" },
  {
    key: "defined-on-slug",
    kind: "defined-on",
    fromPageType: "page-property-definition",
    toPageType: "page-type",
  },
  { key: "domain-parent-slug", kind: "domain-parent", fromPageType: null, toPageType: null },
  { key: "narrows-slug", kind: "narrows", fromPageType: "page-property-definition", toPageType: "page-type" },
  { key: "sequence-slugs", kind: "sequence", fromPageType: null, toPageType: null },
  { key: "required-reading-slugs", kind: "required-reading", fromPageType: null, toPageType: null },
]

function bySlug(pages: readonly PageNode[]): ReadonlyMap<string, readonly PageNode[]> {
  const found = new Map<string, PageNode[]>()
  for (const page of pages) {
    const slug = page.attrs.slug
    if (slug === null) continue
    const held = found.get(slug)
    if (held === undefined) found.set(slug, [page])
    else held.push(page)
  }
  return found
}

function named(
  slug: string,
  from: PageNode,
  reference: Reference,
  index: ReadonlyMap<string, readonly PageNode[]>
): PageNode | null {
  const standing = index.get(slug) ?? []
  const fitting =
    reference.toPageType === null
      ? standing
      : standing.filter((page) => page.attrs.pageTypeSlug === reference.toPageType)
  if (fitting.length === 1) return fitting[0] ?? null
  if (fitting.length === 0) return null
  const own = fitting.filter((page) => page.repo === from.repo)
  if (own.length === 1) return own[0] ?? null
  const shared = fitting.filter((page) => page.repo === SHARED_REPO)
  return shared.length === 1 ? (shared[0] ?? null) : null
}

function namesIn(fm: Frontmatter, reference: Reference): readonly string[] {
  return listField(fm, reference.key).filter((slug) => slug !== "" && slug !== NONE)
}

export const frontmatterEdgeProducer: EdgeProducer = {
  name: "frontmatter",
  edgeKinds: REFERENCES.map((reference) => reference.kind),
  build: (ctx, pages) => {
    const index = bySlug(pages)
    const edges: EdgeInit[] = []
    for (const page of pages) {
      const root = ctx.roots[page.repo]
      if (root === undefined) continue
      const text = textAt(root, page.key)
      if (text === null) continue
      const { fm, why } = blockOf(text)
      if (why !== null) continue
      for (const reference of REFERENCES) {
        if (reference.fromPageType !== null && page.attrs.pageTypeSlug !== reference.fromPageType) continue
        for (const slug of namesIn(fm, reference)) {
          const to = named(slug, page, reference, index)
          if (to === null) continue
          edges.push({
            kind: reference.kind,
            from: { repo: page.repo, key: page.key },
            to: { repo: to.repo, key: to.key },
          })
        }
      }
    }
    return edges
  },
}

export default frontmatterEdgeProducer
