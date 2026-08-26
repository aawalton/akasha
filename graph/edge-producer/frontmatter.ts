import { type Frontmatter, listField } from "../../../instructions/tools/page/frontmatter.ts"
import { addressParts } from "../../../instructions/tools/page/page-address.ts"
import { diskFileTree } from "../../../instructions/tools/page/page-file-tree.ts"
import { registryOf } from "../../../instructions/tools/page/page-registry.ts"
import {
  blockOf,
  NONE,
  type PageType,
  pagesOf,
  stringAt,
  textAt,
} from "../../../instructions/tools/page/page-types.ts"
import type { EdgeInit, EdgeProducer } from "../edge-shape.ts"
import { AKASHA, BORROWED_PAGE_TYPES } from "../node-producer/file.ts"
import type { BuildContext, NodeRef } from "../node-shape.ts"

export const RELATION_EDGE = "relation"

const RELATION_KEY = "relation-key"

const DEFINITION_PAGE_TYPE = "page-property-definition"

const RELATION = "relation"

export type Relation = {
  readonly key: string
  readonly target: string | null
}

type Standing = {
  registry: readonly PageType[] | null
  relations: ReadonlyMap<string, readonly Relation[]> | null
  readonly named: Map<string, ReadonlyMap<string, NodeRef>>
}

const HELD = new WeakMap<BuildContext, Standing>()

function standingIn(ctx: BuildContext): Standing {
  const held = HELD.get(ctx)
  if (held !== undefined) return held
  const made: Standing = { registry: null, relations: null, named: new Map() }
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

function slugNamed(named: string | null): string | null {
  if (named === null) return null
  const address = addressParts(named)
  return address === null ? named : address.slug
}

function declaredIn(ctx: BuildContext): ReadonlyMap<string, readonly Relation[]> {
  const made = new Map<string, Relation[]>()
  for (const pageType of registryIn(ctx)) {
    if (pageType.slug !== DEFINITION_PAGE_TYPE) continue
    const repo = pageType.repo
    if (repo === null) continue
    const root = ctx.roots[repo]
    if (root === undefined) continue
    for (const key of pagesOf(root, pageType)) {
      const text = textAt(root, key)
      if (text === null) continue
      const { fm, why } = blockOf(text)
      if (why !== null) continue
      if (!(stringAt(fm, "type") ?? "").includes(RELATION)) continue
      const on = slugNamed(stringAt(fm, "defined-on-slug"))
      const stated = stringAt(fm, "key")
      if (on === null || stated === null) continue
      const held = made.get(on) ?? []
      held.push({ key: stated, target: slugNamed(stringAt(fm, "target-slug")) })
      made.set(on, held)
    }
  }
  return made
}

function relationsIn(ctx: BuildContext): ReadonlyMap<string, readonly Relation[]> {
  const standing = standingIn(ctx)
  if (standing.relations !== null) return standing.relations
  const declared = declaredIn(ctx)
  const above = new Map(registryIn(ctx).map((one) => [one.slug, one.extends]))
  const made = new Map<string, readonly Relation[]>()
  for (const pageType of registryIn(ctx)) {
    const held = new Map<string, Relation>()
    const walked = new Set<string>()
    let at: string | null = pageType.slug
    while (at !== null && !walked.has(at)) {
      walked.add(at)
      for (const relation of declared.get(at) ?? []) {
        if (!held.has(relation.key)) held.set(relation.key, relation)
      }
      at = above.get(at) ?? null
    }
    made.set(pageType.slug, [...held.values()])
  }
  standing.relations = made
  return made
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

function reached(ctx: BuildContext, named: string, relation: Relation): NodeRef | null {
  const address = addressParts(named)
  const pageType = address === null ? relation.target : address.type
  if (pageType === null) return null
  const slug = address === null ? named : address.slug
  const ref = pagesNamed(ctx, pageType).get(slug)
  if (ref === undefined) return null
  if (ref.repo === AKASHA) return ref
  return BORROWED_PAGE_TYPES.includes(pageType) ? ref : null
}

function namesIn(fm: Frontmatter, relation: Relation): readonly string[] {
  return listField(fm, relation.key).filter((one) => one !== "" && one !== NONE)
}

export const frontmatterEdgeProducer: EdgeProducer = {
  name: "frontmatter",
  edgeKinds: () => [RELATION_EDGE],
  from: (ctx, file) => {
    const pageType = file.attrs["page-type-slug"]
    if (pageType === null) return []
    const root = ctx.roots[file.repo]
    if (root === undefined) return []
    const text = textAt(root, file.key)
    if (text === null) return []
    const { fm, why } = blockOf(text)
    if (why !== null) return []
    const edges: EdgeInit[] = []
    for (const relation of relationsIn(ctx).get(pageType) ?? []) {
      for (const named of namesIn(fm, relation)) {
        const to = reached(ctx, named, relation)
        if (to === null) continue
        edges.push({
          kind: RELATION_EDGE,
          from: { repo: file.repo, key: file.key },
          to,
          attrs: { [RELATION_KEY]: relation.key },
        })
      }
    }
    return edges
  },
}

export default frontmatterEdgeProducer
