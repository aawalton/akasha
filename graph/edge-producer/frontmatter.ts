import { type Frontmatter, listField } from "../../page/frontmatter.ts"
import { type Resolve, type Stated, kindOf, resolveOver } from "../../page/index/identity.ts"
import { loadPages } from "../../page/index/store.ts"
import { NONE, stringAt } from "../../page/text.ts"
import type { EdgeInit, EdgeProducer } from "../edge-shape.ts"
import { frontmatterAt } from "../frontmatter-at.ts"
import type { BuildContext, NodeRef } from "../node-shape.ts"
import { slugNamed } from "../../page/page-address.ts"
import type { PageAt } from "../../page/page-at.ts"
import { pageIndexIn, pagesOfType } from "../page-index.ts"
import { inheritedIn } from "../page-type-above.ts"

export const RELATION_EDGE = "relation"

const RELATION_KEY = "relation-key"

const DEFINITION_PAGE_TYPE = "page-property-definition"

const ID = "id"

const SLUG = "slug"

const SEQ = "seq"

export type Relation = {
  readonly key: string
  readonly kind: string
  readonly target: string | null
}

const HELD = new WeakMap<BuildContext, ReadonlyMap<string, readonly Relation[]>>()

const RESOLVING = new WeakMap<BuildContext, Resolve>()

function frontOf(ctx: BuildContext, at: PageAt): Frontmatter | null {
  return frontmatterAt(ctx, at.repo, at.key)
}

function declaredIn(ctx: BuildContext): ReadonlyMap<string, readonly Relation[]> {
  const made = new Map<string, Relation[]>()
  for (const at of pagesOfType(ctx, DEFINITION_PAGE_TYPE)) {
    const fm = frontOf(ctx, at)
    if (fm === null) continue
    const kind = kindOf(stringAt(fm, "type") ?? "")
    if (kind === null) continue
    const on = slugNamed(stringAt(fm, "defined-on-slug"))
    const stated = stringAt(fm, "key")
    if (on === null || stated === null) continue
    const held = made.get(on) ?? []
    held.push({ key: stated, kind, target: slugNamed(stringAt(fm, "target-slug")) })
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

function indexedFor(ctx: BuildContext): readonly Stated[] | null {
  const held = loadPages().filter((one) => ctx.roots[one.repo] !== undefined)
  return held.length === 0 ? null : held
}

function readFor(ctx: BuildContext): readonly Stated[] {
  const stated: Stated[] = []
  for (const [, pages] of pageIndexIn(ctx).byType) {
    for (const at of pages) {
      const fm = frontOf(ctx, at)
      if (fm === null) continue
      stated.push({
        repo: at.repo,
        key: at.key,
        stem: at.stem,
        type: at.type,
        id: stringAt(fm, ID),
        slug: stringAt(fm, SLUG),
        seq: stringAt(fm, SEQ),
      })
    }
  }
  return stated
}

function resolvingIn(ctx: BuildContext): Resolve {
  const held = RESOLVING.get(ctx)
  if (held !== undefined) return held
  const made = resolveOver(indexedFor(ctx) ?? readFor(ctx))
  RESOLVING.set(ctx, made)
  return made
}

function reached(ctx: BuildContext, named: string, relation: Relation): NodeRef | null {
  return resolvingIn(ctx)(relation.kind, relation.target, named)
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
