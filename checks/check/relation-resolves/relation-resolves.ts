import { isAttachmentFile } from "../../../page/attachment-file.ts"
import type { FileTree } from "../../../page/file-tree.ts"
import { stemOf } from "../../../page/name/name.ts"
import {
  blockOf,
  claimant,
  globFor,
  pagesOf,
  placesIn,
  reposOf,
  textAt,
  type PageType,
} from "../../../page/page-types.ts"
import { declarationsOf } from "../../../page/property/declarations.ts"
import { chainOf } from "../../../page/property/frontmatter.ts"
import { registryOf } from "../../../page/property/registry.ts"
import {
  bearersFor,
  borneBy,
  carriedBy,
  pointsBy,
  relationsOn,
  type Points,
  type Reading,
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

function chainsOver(defs: FileTree): Chains {
  const chains = new Map<string, readonly string[]>()
  return (type) => {
    const standing = chains.get(type.relPath)
    if (standing !== undefined) return standing
    const { relPaths } = chainOf(type, defs)
    const made = relPaths === null ? [type.slug] : relPaths.map(stemOf)
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
    const claim = claimant(relPath, AKASHA, types, text)
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

function orphanedBy(batch: Batch): readonly CheckFailure[] {
  const tree = batch.tree
  const gone = tree
    .gone()
    .map((path) => path.slice(tree.root.length + 1))
    .filter((relPath) => isPage(relPath))
  if (gone.length === 0) return []
  const defs = treeOver(batch)
  if (defs === null) return []
  const types = registryOf(defs)
  const chainFor = chainsOver(defs)
  const going = valuesGoing(gone, tree.root, defs, types, chainFor)
  if (going.size === 0) return []
  const bearers = bearersFor(remainingRead(tree, types, chainFor))
  const failures: CheckFailure[] = []
  for (const path of [...tree.paths()].sort()) {
    const relPath = path.slice(tree.root.length + 1)
    if (!isPage(relPath)) continue
    const body = tree.at(path)
    if (body === null) continue
    const text = body.toString("utf8")
    const { fm, why } = blockOf(text)
    if (why !== null) continue
    const claim = claimant(relPath, AKASHA, types, text)
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
  return failures
}

export const relationResolves: Check = {
  slug: SLUG,
  needs: "tree",
  run: (batch: Batch): readonly CheckFailure[] => orphanedBy(batch),
}

export default relationResolves
