import { type Frontmatter, listField } from "../../page/frontmatter.ts"
import { NONE, stringAt } from "../../page/text.ts"
import type { EdgeInit, EdgeProducer } from "../edge-shape.ts"
import { frontmatterAt } from "../frontmatter-at.ts"
import type { BuildContext, NodeRef } from "../node-shape.ts"
import { type PageAt, pageNamed, pagesOfType } from "../page-index.ts"

const ADDRESS = /^([a-z0-9-]+)\/([a-z0-9-]+)$/

type Address = {
  readonly type: string
  readonly slug: string
}

function addressParts(text: string): Address | null {
  const found = ADDRESS.exec(text)
  if (found === null) return null
  const type = found[1]
  const slug = found[2]
  return type === undefined || slug === undefined ? null : { type, slug }
}

export const RELATION_EDGE = "relation"

const RELATION_KEY = "relation-key"

const PAGE_TYPE = "page-type"

const DEFINITION_PAGE_TYPE = "page-property-definition"

const RELATION = "relation"

const EXTENDS_KEY = "extends-slug"

export type Relation = {
  readonly key: string
  readonly target: string | null
}

type Standing = {
  above: ReadonlyMap<string, string | null> | null
  relations: ReadonlyMap<string, readonly Relation[]> | null
}

const HELD = new WeakMap<BuildContext, Standing>()

function standingIn(ctx: BuildContext): Standing {
  const held = HELD.get(ctx)
  if (held !== undefined) return held
  const made: Standing = { above: null, relations: null }
  HELD.set(ctx, made)
  return made
}

function frontOf(ctx: BuildContext, at: PageAt): Frontmatter | null {
  return frontmatterAt(ctx, at.repo, at.key)
}

function slugNamed(named: string | null): string | null {
  if (named === null) return null
  const address = addressParts(named)
  return address === null ? named : address.slug
}

function aboveIn(ctx: BuildContext): ReadonlyMap<string, string | null> {
  const standing = standingIn(ctx)
  if (standing.above !== null) return standing.above
  const made = new Map<string, string | null>()
  for (const at of pagesOfType(ctx, PAGE_TYPE)) {
    const fm = frontOf(ctx, at)
    made.set(at.stem, fm === null ? null : slugNamed(stringAt(fm, EXTENDS_KEY)))
  }
  standing.above = made
  return made
}

function declaredIn(ctx: BuildContext): ReadonlyMap<string, readonly Relation[]> {
  const made = new Map<string, Relation[]>()
  for (const at of pagesOfType(ctx, DEFINITION_PAGE_TYPE)) {
    const fm = frontOf(ctx, at)
    if (fm === null) continue
    if (!(stringAt(fm, "type") ?? "").includes(RELATION)) continue
    const on = slugNamed(stringAt(fm, "defined-on-slug"))
    const stated = stringAt(fm, "key")
    if (on === null || stated === null) continue
    const held = made.get(on) ?? []
    held.push({ key: stated, target: slugNamed(stringAt(fm, "target-slug")) })
    made.set(on, held)
  }
  return made
}

function relationsIn(ctx: BuildContext): ReadonlyMap<string, readonly Relation[]> {
  const standing = standingIn(ctx)
  if (standing.relations !== null) return standing.relations
  const declared = declaredIn(ctx)
  const above = aboveIn(ctx)
  const made = new Map<string, readonly Relation[]>()
  for (const pageType of above.keys()) {
    const held = new Map<string, Relation>()
    const walked = new Set<string>()
    let at: string | null = pageType
    while (at !== null && !walked.has(at)) {
      walked.add(at)
      for (const relation of declared.get(at) ?? []) {
        if (!held.has(relation.key)) held.set(relation.key, relation)
      }
      at = above.get(at) ?? null
    }
    made.set(pageType, [...held.values()])
  }
  standing.relations = made
  return made
}

function reached(ctx: BuildContext, named: string, relation: Relation): NodeRef | null {
  const address = addressParts(named)
  const pageType = address === null ? relation.target : address.type
  if (pageType === null) return null
  const slug = address === null ? named : address.slug
  return pageNamed(ctx, pageType, slug)
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
    const fm = frontmatterAt(ctx, file.repo, file.key)
    if (fm === null) return []
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
