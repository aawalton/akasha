import type { BuildContext } from "../../build-context/build-context.ts"
import { frontmatterAt } from "../../frontmatter-at/frontmatter-at.ts"
import fileNodeProducer, {
  FILE_NODE_KIND,
} from "../../node-producer/file/file.graph-node-producer.code.attachment.ts"
import type { NodeRef } from "../../node-producer/node-shape.ts"
import {
  type Held,
  type Resolve,
  type Stated,
  identityOver,
  resolveOver,
  statedOf,
} from "../../../page/index/identity/identity.ts"
import { linkTargetsFrom } from "../../../page/index/link/link.ts"
import { pageTargetOf } from "../../../page/index/place/place.ts"
import {
  type Holds,
  type Relation,
  reachedFrom,
  relationsOver,
} from "../../../page/index/relation/relation.ts"
import { loadPages, loadRelations } from "../../../page/index/store/store.ts"
import { pageNameOf } from "../../../page/name/name.ts"
import { textAt } from "../../../page/text/text.ts"
import type { EdgeInit, EdgeProducer } from "../edge-shape.ts"

export const RELATION_EDGE = "relation"

export const RELATION_KEY = "relation-key"

const LINKS_SAID = "relation-links"

const ADDRESS_JOIN = "/"

type Standing = {
  readonly relations: ReadonlyMap<string, readonly Relation[]>
  readonly resolve: Resolve
  readonly nodeAt: ReadonlyMap<string, NodeRef>
}

const STANDING = new WeakMap<BuildContext, Standing>()

/**
 * What the pages index says about relations, read once per context.
 *
 * THE INDEX IS READ RATHER THAN THE DEFINITIONS WALKED. `relations.json` already holds every
 * relation each page type carries, inheritance resolved, and `pages.jsonl` already holds the
 * identity fields every target is resolved through. Deriving either here is the same work the
 * index did, done a second time and answering the same.
 *
 * AN EMPTY INDEX FALLS BACK TO THE TREE, because a repository the index was never built over
 * would otherwise report a page as relating to nothing, which reads exactly like a page that
 * relates to nothing.
 */
function standingIn(ctx: BuildContext): Standing {
  const had = STANDING.get(ctx)
  if (had !== undefined) return had
  let pages: readonly Stated[] = loadPages()
  let relations = loadRelations()
  if (pages.length === 0 || relations.size === 0) {
    const identity = identityOver(ctx.roots)
    relations = relationsOver(identity.pages)
    pages = identity.pages.map(statedOf)
  }
  const nodeAt = new Map<string, NodeRef>()
  for (const one of pages) {
    nodeAt.set(pageTargetOf(one.stem, one.type), { repo: one.repo, key: one.key })
  }
  const made: Standing = { relations, resolve: resolveOver(pages), nodeAt }
  STANDING.set(ctx, made)
  return made
}

/**
 * Every path this page's prose names, held against the file it was read from.
 *
 * A link is a relation key rather than an edge type of its own, by Alan's ruling on 2026-08-27:
 * the page's prose naming a path and its frontmatter declaring a claim are the same way of
 * connecting, and `link` is the key that says which one this was.
 */
function linksFor(ctx: BuildContext, repo: string, key: string): readonly string[] {
  const root = ctx.roots[repo]
  if (root === undefined) return []
  const held = ctx.said.of(LINKS_SAID, repo, key, () => {
    const text = textAt(root, key)
    return text === null ? [] : linkTargetsFrom(repo, key, text)
  })
  if (!Array.isArray(held)) return []
  return held.filter((one): one is string => typeof one === "string")
}

/**
 * The node an index target names.
 *
 * A page end carries no separator, being a stem and a type; a file end is a repository and a path
 * within it, so the first separator is what tells them apart.
 */
function refOf(target: string, nodeAt: ReadonlyMap<string, NodeRef>): NodeRef | null {
  const cut = target.indexOf(ADDRESS_JOIN)
  if (cut < 0) return nodeAt.get(target) ?? null
  return { repo: target.slice(0, cut), key: target.slice(cut + 1) }
}

export const relationEdgeProducer: EdgeProducer = {
  name: "relation",
  edgeKinds: () => [RELATION_EDGE],
  from: (ctx, node) => {
    if (node.kind !== FILE_NODE_KIND) return []
    const named = pageNameOf(node.key)
    if (named === null) return []
    const fm = frontmatterAt(ctx, node.repo, node.key)
    if (fm === null) return []
    const { relations, resolve, nodeAt } = standingIn(ctx)
    const at: Held = {
      repo: node.repo,
      key: node.key,
      stem: named.stem,
      type: named.type,
      fm,
      links: linksFor(ctx, node.repo, node.key),
    }
    const holds: Holds = (repo, key) => fileNodeProducer.at(ctx, { repo, key }) !== null
    const from: NodeRef = { repo: node.repo, key: node.key }
    const edges: EdgeInit[] = []
    for (const one of reachedFrom(at, relations, resolve, holds)) {
      const to = refOf(one.target, nodeAt)
      if (to === null) continue
      if (fileNodeProducer.at(ctx, to) === null) continue
      edges.push({ kind: RELATION_EDGE, from, to, attrs: { [RELATION_KEY]: one.relation } })
    }
    return edges
  },
}

export default relationEdgeProducer
