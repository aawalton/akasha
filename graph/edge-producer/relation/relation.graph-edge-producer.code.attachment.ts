import { existsSync, readdirSync } from "node:fs"
import type { BuildContext, SaidName } from "../../build-context/build-context.ts"
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
import { pageTargetOf, relationsRoot } from "../../../page/index/place/place.ts"
import {
  type Holds,
  type Relation,
  reachedFrom,
  relationsOver,
} from "../../../page/index/relation/relation.ts"
import { indexFreshFor, loadPages, loadRelations, sourcesAt } from "../../../page/index/store/store.ts"
import { pageNameOf } from "../../../page/name/name.ts"
import { textAt } from "../../../page/text/text.ts"
import type { EdgeInit, EdgeProducer } from "../edge-shape.ts"

export const RELATION_EDGE = "relation"

export const RELATION_KEY = "relation-key"

// The answer held here is what `linkTargetsFrom` works out, so that file is what its mark is taken
// over rather than this producer, whose other logic the answer does not depend on.
export const LINKS_SAID: SaidName = {
  name: "relation-links",
  entry: "page/index/link/link.ts",
}

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

type Targeting = {
  readonly keys: readonly string[]
}

const TARGETING = new WeakMap<BuildContext, Targeting | null>()

/**
 * What the reverse index can answer with, or nothing where it cannot be trusted to.
 *
 * EVERY REPOSITORY IS WEIGHED, NOT THE ONE ASKED ABOUT. What reaches a node may be declared in any
 * repository the graph reads, so one of them drifting is enough to make a targeted answer short,
 * and a short answer here is an edge nothing ever finds rather than one found slowly.
 */
function targetingIn(ctx: BuildContext): Targeting | null {
  const had = TARGETING.get(ctx)
  if (had !== undefined) return had
  const made = ((): Targeting | null => {
    for (const [repo, root] of Object.entries(ctx.roots)) {
      if (root === undefined) continue
      if (!indexFreshFor(repo, root)) return null
    }
    const at = relationsRoot()
    if (!existsSync(at)) return null
    return { keys: readdirSync(at) }
  })()
  TARGETING.set(ctx, made)
  return made
}

/**
 * Both names the index could have filed an edge into this node under.
 *
 * A page is reached by its stem and type where a relation resolved it as a page, and by its
 * repository and path where one named it as a file. One page can be reached both ways, so both
 * are asked rather than whichever looks more likely.
 */
function namesOf(ref: NodeRef): readonly string[] {
  const found = [`${ref.repo}${ADDRESS_JOIN}${ref.key}`]
  const named = pageNameOf(ref.key)
  if (named !== null) found.push(pageTargetOf(named.stem, named.type))
  return found
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
  into: (ctx, ref) => {
    const targeting = targetingIn(ctx)
    if (targeting === null) return null
    const names = namesOf(ref)
    const edges: EdgeInit[] = []
    for (const key of targeting.keys) {
      for (const name of names) {
        for (const from of sourcesAt(key, name)) {
          if (fileNodeProducer.at(ctx, from) === null) continue
          edges.push({ kind: RELATION_EDGE, from, to: ref, attrs: { [RELATION_KEY]: key } })
        }
      }
    }
    return edges
  },
}

export default relationEdgeProducer
