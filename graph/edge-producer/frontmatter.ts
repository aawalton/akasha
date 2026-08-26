import { type Frontmatter, listField } from "../../page/frontmatter.ts"
import { NONE, stringAt } from "../../page/text.ts"
import type { EdgeInit, EdgeProducer } from "../edge-shape.ts"
import { frontmatterAt } from "../frontmatter-at.ts"
import { addressParts, slugNamed } from "../page-address.ts"
import { inheritedIn } from "../page-type-above.ts"
import type { BuildContext, NodeRef } from "../node-shape.ts"
import { type PageAt, pageNamed, pagesOfType } from "../page-index.ts"

export const RELATION_EDGE = "relation"

const RELATION_KEY = "relation-key"

const DEFINITION_PAGE_TYPE = "page-property-definition"

const RELATION = "relation"

export type Relation = {
  readonly key: string
  readonly target: string | null
}

const HELD = new WeakMap<BuildContext, ReadonlyMap<string, readonly Relation[]>>()

function frontOf(ctx: BuildContext, at: PageAt): Frontmatter | null {
  return frontmatterAt(ctx, at.repo, at.key)
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
  const held = HELD.get(ctx)
  if (held !== undefined) return held
  const made = inheritedIn(ctx, declaredIn(ctx), (one) => one.key)
  HELD.set(ctx, made)
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
