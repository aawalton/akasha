import { attachmentFileOf } from "../../../page/attachment-file.ts"
import { type Frontmatter, listField } from "../../../page/frontmatter.ts"
import {
  BY_FILE,
  type Resolve,
  type Stated,
  kindOf,
  resolveOver,
  statedOf,
} from "../../../page/index/identity/identity.ts"
import { NONE, stringAt } from "../../../page/text/text.ts"
import type { EdgeInit, EdgeProducer } from "../edge-shape.ts"
import { frontmatterAt } from "../../frontmatter-at/frontmatter-at.ts"
import type { BuildContext } from "../../build-context/build-context.ts"
import fileNodeProducer from "../../node-producer/file/file.graph-node-producer.code.attachment.ts"
import type { NodeRef } from "../../node-producer/node-shape.ts"
import { slugNamed } from "../../../page/page-address.ts"
import type { PageAt } from "../../../page/page.ts"
import { pageIndexIn, pagesOfType, statedIn } from "../../page-index/page-index.ts"
import { inheritedIn } from "../../page-type-above/page-type-above.ts"

export const RELATION_EDGE = "relation"

export const RELATION_KEY = "relation-key"

const DEFINITION_PAGE_TYPE = "page-property-definition"

const REPO_MARK = ":"

export type Relation = {
  readonly key: string
  readonly kind: string | null
  readonly target: string | null
  readonly attachment: string | null
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
    const attachment = stringAt(fm, "attachment")
    const kind = kindOf(stringAt(fm, "type") ?? "")
    if (kind === null && attachment === null) continue
    const on = slugNamed(stringAt(fm, "defined-on-slug"))
    const stated = stringAt(fm, "key")
    if (on === null || stated === null) continue
    const held = made.get(on) ?? []
    held.push({ key: stated, kind, target: slugNamed(stringAt(fm, "target-slug")), attachment })
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
  const held = statedIn(ctx)
  return held.length === 0 ? null : held
}

function readFor(ctx: BuildContext): readonly Stated[] {
  const stated: Stated[] = []
  for (const [, pages] of pageIndexIn(ctx).byType) {
    for (const at of pages) {
      const fm = frontOf(ctx, at)
      if (fm === null) continue
      stated.push(statedOf({ repo: at.repo, key: at.key, stem: at.stem, type: at.type, fm }))
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

function fileAt(ctx: BuildContext, repo: string, named: string): NodeRef | null {
  return trackedAt(ctx, refOf(repo, named))
}

function refOf(repo: string, named: string): NodeRef {
  const cut = named.indexOf(REPO_MARK)
  return cut < 0 ? { repo, key: named } : { repo: named.slice(0, cut), key: named.slice(cut + 1) }
}

function trackedAt(ctx: BuildContext, ref: NodeRef): NodeRef | null {
  return fileNodeProducer.at(ctx, ref) === null ? null : ref
}

function attachedAt(ctx: BuildContext, from: NodeRef, relation: Relation): NodeRef | null {
  if (relation.attachment === null) return null
  const key = attachmentFileOf(from.key, relation.key, relation.attachment)
  return trackedAt(ctx, { repo: from.repo, key })
}

function reached(
  ctx: BuildContext,
  from: NodeRef,
  named: string,
  relation: Relation
): NodeRef | null {
  if (relation.kind === null) return null
  if (relation.kind === BY_FILE) return fileAt(ctx, from.repo, named)
  return resolvingIn(ctx)(relation.kind, relation.target, named)
}

function namesIn(fm: Frontmatter, relation: Relation): readonly string[] {
  return listField(fm, relation.key).filter((one) => one !== "" && one !== NONE)
}

function endsOf(
  ctx: BuildContext,
  from: NodeRef,
  fm: Frontmatter,
  relation: Relation
): readonly NodeRef[] {
  if (relation.attachment !== null) {
    const to = attachedAt(ctx, from, relation)
    return to === null ? [] : [to]
  }
  const ends: NodeRef[] = []
  for (const named of namesIn(fm, relation)) {
    const to = reached(ctx, from, named, relation)
    if (to !== null) ends.push(to)
  }
  return ends
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
      for (const to of endsOf(ctx, file, fm, relation)) {
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
