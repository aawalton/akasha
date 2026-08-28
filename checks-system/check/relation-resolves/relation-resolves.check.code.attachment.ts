import { isAttachmentFile } from "../../../page/attachment-file.ts"
import type { FileTree } from "../../../page/file-tree.ts"
import { pageNameOf, pageStemOf } from "../../../page/name/name.ts"
import { pageTargetOf } from "../../../page/index/place/place.ts"
import { loadRelations, sourcesAt } from "../../../page/index/store/store.ts"
import { mortalityIn, type Mortality } from "../../../page/mortal/mortal.ts"
import { addressParts } from "../../../page/page-address.ts"
import { claimant, pagesOf, placesIn, reposOf, type PageType } from "../../../page/page-types.ts"
import { globFor } from "../../../page/glob/glob.ts"
import { blockOf, textAt } from "../../../page/text/text.ts"
import { declarationsOf } from "../../../page/property/declarations.ts"
import { chainOf } from "../../../page/property/frontmatter.ts"
import { registryOf } from "../../../page/property/registry.ts"
import {
  bearersFor,
  borneBy,
  carriedBy,
  pointsBy,
  relationsOn,
  unread,
  unresolvable,
  wantsOf,
  type Bearers,
  type Points,
  type Reading,
  type Want,
} from "../../../page/relation/relation.ts"
import { AKASHA, rootsHere } from "../../../repo/roots/roots.ts"
import type { Batch, Check, CheckFailure, Tree } from "../check-shape.ts"
import { treeOver } from "../page-holds-to-its-type/staged-tree.ts"

const SLUG = "relation-resolves"

const MARKDOWN = ".md"

const APART = "\n"

type Shape = {
  readonly target: string | null
  readonly points: Points
  readonly slugProperty: string | null
}

type Chains = (type: PageType) => readonly string[]

function shapeKeyOf(shape: Shape): string {
  return `${shape.target ?? ""}${APART}${shape.points}${APART}${shape.slugProperty ?? ""}`
}

function isPage(relPath: string): boolean {
  return relPath.endsWith(MARKDOWN) && !isAttachmentFile(relPath)
}

function namesMortal(want: Want, mortal: Mortality): boolean {
  const stated = want.relation.points === "address" ? addressParts(want.value)?.type ?? null : null
  const named = stated ?? want.relation.target
  return named !== null && mortal.typeNamed(named)
}

function chainsOver(defs: FileTree): Chains {
  const chains = new Map<string, readonly string[]>()
  return (type) => {
    const standing = chains.get(type.relPath)
    if (standing !== undefined) return standing
    const { relPaths } = chainOf(type, defs)
    const made = relPaths === null ? [type.slug] : relPaths.map((at) => pageStemOf(at))
    chains.set(type.relPath, made)
    return made
  }
}

function shapesDeclared(defs: FileTree): readonly Shape[] {
  const held = new Map<string, Shape>()
  for (const [, standing] of declarationsOf(defs).bySlug) {
    for (const one of standing) {
      const points = pointsBy(one.type)
      if (points === null) continue
      if (one.target === null && points !== "address") continue
      const shape: Shape = {
        target: one.target,
        points,
        slugProperty: points === "name" ? one.slugProperty : null,
      }
      held.set(shapeKeyOf(shape), shape)
    }
  }
  return [...held.values()]
}

function valuesGoing(
  gone: readonly string[],
  root: string,
  defs: FileTree,
  types: readonly PageType[],
  chainFor: Chains
): ReadonlyMap<string, string> {
  const shapes = shapesDeclared(defs)
  const held = new Map<string, string>()
  for (const relPath of gone) {
    const text = textAt(root, relPath)
    if (text === null) continue
    const { fm, why } = blockOf(text)
    if (why !== null) continue
    const claim = claimant(relPath, types)
    if (claim.type === null) continue
    const chain = new Set(chainFor(claim.type))
    for (const shape of shapes) {
      if (shape.target !== null && !chain.has(shape.target)) continue
      const value = borneBy(fm, relPath, shape.points, shape.slugProperty, claim.type)
      if (value !== null) held.set(`${shapeKeyOf(shape)}${APART}${value}`, relPath)
    }
  }
  return held
}

function remainingRead(tree: Tree, types: readonly PageType[], chainFor: Chains): Reading {
  const roots = rootsHere()
  const standing = tree.paths().map((path) => path.slice(tree.root.length + 1))
  const listings = new Map<string, readonly string[]>()
  return {
    types,
    chainOf: chainFor,
    listing: (type) => {
      const held = listings.get(type.relPath)
      if (held !== undefined) return held
      const found: string[] = []
      for (const repo of reposOf(type)) {
        if (repo === AKASHA) {
          const globs = placesIn(type, AKASHA).map((one) => globFor(one))
          for (const relPath of standing) {
            if (globs.some((one) => one.match(relPath))) found.push(relPath)
          }
          continue
        }
        const root = roots[repo]
        if (root !== undefined) found.push(...pagesOf(root, type, repo))
      }
      const made = [...new Set(found)]
      listings.set(type.relPath, made)
      return made
    },
    open: (type, relPath) => {
      for (const repo of reposOf(type)) {
        if (repo === AKASHA) {
          const body = tree.at(`${tree.root}/${relPath}`)
          if (body !== null) return body.toString("utf8")
          continue
        }
        const root = roots[repo]
        const text = root === undefined ? null : textAt(root, relPath)
        if (text !== null) return text
      }
      return null
    },
  }
}

function relationKeys(): readonly string[] {
  const keys = new Set<string>()
  for (const held of loadRelations().values()) {
    for (const one of held) keys.add(one.key)
  }
  return [...keys]
}

function targetsOf(gone: readonly string[]): readonly string[] {
  const found = new Set<string>()
  for (const relPath of gone) {
    const named = pageNameOf(relPath)
    if (named === null) continue
    found.add(pageTargetOf(named.stem, named.type))
  }
  return [...found]
}

function namingGone(gone: readonly string[], root: string): readonly string[] {
  const targets = targetsOf(gone)
  if (targets.length === 0) return []
  const found = new Set<string>()
  for (const key of relationKeys()) {
    for (const target of targets) {
      for (const source of sourcesAt(key, target)) {
        if (source.repo === AKASHA) found.add(`${root}/${source.key}`)
      }
    }
  }
  return [...found]
}

function stated(want: Want): string {
  return `${want.relation.key}${APART}${want.relation.target ?? ""}${APART}${want.value}`
}

function askedIn(text: string, relPath: string, defs: FileTree, types: readonly PageType[]): ReadonlySet<string> {
  const { fm, why } = blockOf(text)
  if (why !== null) return new Set()
  const claim = claimant(relPath, types)
  if (claim.type === null) return new Set()
  const { relations, why: unbuilt } = relationsOn(claim.type, defs)
  if (unbuilt !== null) return new Set()
  return new Set(wantsOf(relations, fm).asked.map(stated))
}

type Wanted = { readonly path: string; readonly want: Want }

function wantedIn(
  batch: Batch,
  defs: FileTree,
  types: readonly PageType[],
  mortal: Mortality
): readonly Wanted[] {
  const tree = batch.tree
  const found: Wanted[] = []
  for (const path of batch.paths) {
    const relPath = path.slice(tree.root.length + 1)
    if (!isPage(relPath)) continue
    if (mortal.pageAt(relPath)) continue
    const body = tree.at(path)
    if (body === null) continue
    const text = body.toString("utf8")
    const { fm, why } = blockOf(text)
    if (why !== null) continue
    const claim = claimant(relPath, types)
    if (claim.type === null) continue
    const { relations, why: unbuilt } = relationsOn(claim.type, defs)
    if (unbuilt !== null || relations.length === 0) continue
    const before = textAt(tree.root, relPath)
    const standing = before === null ? new Set<string>() : askedIn(before, relPath, defs, types)
    for (const want of wantsOf(relations, fm).asked) {
      if (standing.has(stated(want))) continue
      if (namesMortal(want, mortal)) continue
      found.push({ path, want })
    }
  }
  return found
}

function unresolvedBy(wanted: readonly Wanted[], bearers: Bearers): readonly CheckFailure[] {
  const failures: CheckFailure[] = []
  for (const one of wanted) {
    if (bearers.holds(one.want)) continue
    failures.push({ path: one.path, reason: unresolvable(one.want) })
  }
  return failures
}

function withUnread(failures: readonly CheckFailure[], bearers: Bearers): readonly CheckFailure[] {
  const first = failures[0]
  if (first === undefined || bearers.missed.size === 0) return failures
  return [...failures, ...unread(bearers.missed).map((reason) => ({ path: first.path, reason }))]
}

function orphanedBy(batch: Batch): readonly CheckFailure[] {
  const tree = batch.tree
  const defs = treeOver(batch)
  if (defs === null) return []
  const types = registryOf(defs)
  const mortal = mortalityIn(defs, types)
  const gone = tree
    .gone()
    .map((path) => path.slice(tree.root.length + 1))
    .filter((relPath) => isPage(relPath) && !mortal.pageAt(relPath))
  const chainFor = chainsOver(defs)
  const going =
    gone.length === 0
      ? new Map<string, string>()
      : valuesGoing(gone, tree.root, defs, types, chainFor)
  const wanted = wantedIn(batch, defs, types, mortal)
  if (going.size === 0 && wanted.length === 0) return []
  const bearers = bearersFor(remainingRead(tree, types, chainFor))
  const failures: CheckFailure[] = [...unresolvedBy(wanted, bearers)]
  if (going.size === 0) return withUnread(failures, bearers)
  const candidates = new Set([...namingGone(gone, tree.root), ...batch.paths])
  for (const path of [...candidates].sort()) {
    const relPath = path.slice(tree.root.length + 1)
    if (!isPage(relPath)) continue
    if (mortal.pageAt(relPath)) continue
    const body = tree.at(path)
    if (body === null) continue
    const text = body.toString("utf8")
    const { fm, why } = blockOf(text)
    if (why !== null) continue
    const claim = claimant(relPath, types)
    if (claim.type === null) continue
    for (const relation of relationsOn(claim.type, defs).relations) {
      if (relation.mayBeGone) continue
      const shape = shapeKeyOf(relation)
      for (const value of carriedBy(fm, relation.key)) {
        const at = going.get(`${shape}${APART}${value}`)
        if (at === undefined) continue
        if (bearers.holds({ relation, value })) continue
        failures.push({
          path,
          reason:
            `\`${relation.key}\` names \`${value}\`, and \`${at}\` is the page that carries it — ` +
            "remove them in this same call, or repoint the relation first",
        })
      }
    }
  }
  return withUnread(failures, bearers)
}

export const relationResolves: Check = {
  slug: SLUG,
  needs: "tree",
  run: (batch: Batch): readonly CheckFailure[] => orphanedBy(batch),
}

export default relationResolves
