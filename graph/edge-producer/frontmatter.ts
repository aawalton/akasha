import { type Frontmatter, listField } from "../../../instructions/tools/page/frontmatter.ts"
import { addressParts } from "../../../instructions/tools/page/page-address.ts"
import { diskFileTree } from "../../../instructions/tools/page/page-file-tree.ts"
import { registryOf } from "../../../instructions/tools/page/page-registry.ts"
import {
  blockOf,
  NONE,
  type PageType,
  pagesOf,
  textAt,
} from "../../../instructions/tools/page/page-types.ts"
import type { EdgeInit, EdgeProducer } from "../edge-shape.ts"
import type { FileNode } from "../node-producer/file.ts"
import type { BuildContext, NodeRef } from "../node-shape.ts"

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
  {
    key: "narrows-slug",
    kind: "narrows",
    fromPageType: "page-property-definition",
    toPageType: "page-type",
  },
  { key: "sequence-slugs", kind: "sequence", fromPageType: null, toPageType: null },
  { key: "required-reading-slugs", kind: "required-reading", fromPageType: null, toPageType: null },
]

type Standing = {
  registry: readonly PageType[] | null
  readonly named: Map<string, ReadonlyMap<string, NodeRef>>
}

const HELD = new WeakMap<BuildContext, Standing>()

function standingIn(ctx: BuildContext): Standing {
  const held = HELD.get(ctx)
  if (held !== undefined) return held
  const made: Standing = { registry: null, named: new Map() }
  HELD.set(ctx, made)
  return made
}

function registryIn(ctx: BuildContext): readonly PageType[] {
  const standing = standingIn(ctx)
  if (standing.registry !== null) return standing.registry
  const made = registryOf(diskFileTree(ctx.roots))
  standing.registry = made
  return made
}

function stemOf(key: string): string {
  const base = key.slice(key.lastIndexOf("/") + 1)
  return base.split(".")[0] ?? base
}

function pagesNamed(ctx: BuildContext, pageType: string): ReadonlyMap<string, NodeRef> {
  const standing = standingIn(ctx)
  const held = standing.named.get(pageType)
  if (held !== undefined) return held
  const made = new Map<string, NodeRef>()
  for (const one of registryIn(ctx)) {
    if (one.slug !== pageType) continue
    const repo = one.repo
    if (repo === null) continue
    const root = ctx.roots[repo]
    if (root === undefined) continue
    for (const key of pagesOf(root, one)) {
      const stem = stemOf(key)
      if (made.has(stem)) continue
      made.set(stem, { repo, key })
    }
  }
  standing.named.set(pageType, made)
  return made
}

function reached(ctx: BuildContext, named: string, reference: Reference): NodeRef | null {
  const address = addressParts(named)
  const pageType = address === null ? reference.toPageType : address.type
  if (pageType === null) return null
  const slug = address === null ? named : address.slug
  return pagesNamed(ctx, pageType).get(slug) ?? null
}

function namesIn(fm: Frontmatter, reference: Reference): readonly string[] {
  return listField(fm, reference.key).filter((slug) => slug !== "" && slug !== NONE)
}

export const frontmatterEdgeProducer: EdgeProducer = {
  name: "frontmatter",
  edgeKinds: REFERENCES.map((reference) => reference.kind),
  from: (ctx, file) => {
    const root = ctx.roots[file.repo]
    if (root === undefined) return []
    const text = textAt(root, file.key)
    if (text === null) return []
    const { fm, why } = blockOf(text)
    if (why !== null) return []
    const edges: EdgeInit[] = []
    for (const reference of REFERENCES) {
      if (reference.fromPageType !== null && file.attrs["page-type-slug"] !== reference.fromPageType)
        continue
      for (const named of namesIn(fm, reference)) {
        const to = reached(ctx, named, reference)
        if (to === null) continue
        edges.push({ kind: reference.kind, from: { repo: file.repo, key: file.key }, to })
      }
    }
    return edges
  },
}

export default frontmatterEdgeProducer
