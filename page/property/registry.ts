import { answeredWhole } from "./answer-cache.ts"
import { shapeMarkOf } from "../shape/mark.ts"
import type { FileTree } from "../file-tree.ts"
import { createHash } from "node:crypto"
import {
  globsIn,
  PAGE_TYPE_GLOBS,
  PAGE_TYPE_KINDS,
  type PageType,
  pageTypeRecord,
  pageTypeStatedAt,
  type StatedPageType,
} from "../page-types.ts"
import { pageTypeOf } from "../../pages-system/page-type/page-type.ts"
import { loadPages, rowsStamp } from "../index/store/store.ts"
import { akashaRoot } from "../../repo/roots/roots.ts"
import { canonicalize } from "../../repo/path/path.ts"

const registries = new WeakMap<FileTree, readonly PageType[]>()

export function registryOf(tree: FileTree): readonly PageType[] {
  const held = registries.get(tree)
  if (held !== undefined) return held
  const made = heldRegistry(tree)
  registries.set(tree, made)
  return made
}

export function indexStamp(): string {
  return createHash("sha256").update(rowsStamp()).digest("hex").slice(0, 16)
}

const anyStated = (one: readonly StatedPageType[]): boolean => one.length > 0

function heldRegistry(tree: FileTree): readonly PageType[] {
  const shape = shapeMarkOf(tree)
  const mark = shape === null ? null : `${shape}-${indexStamp()}`
  const root = tree.root
  const same = (one: readonly StatedPageType[]): readonly StatedPageType[] => one
  const stated =
    mark === null || root === undefined
      ? statedRegistry(tree)
      : answeredWhole(root, mark, "registry", () => statedRegistry(tree), same, same, anyStated)
  return stated.map((one) => pageTypeRecord(one, tree.repoOf(one.slug)))
}

function statedOver(relPaths: readonly string[], tree: FileTree): ReadonlyMap<string, StatedPageType> {
  const made = new Map<string, StatedPageType>()
  for (const relPath of relPaths) {
    const text = tree.open(relPath)
    if (text === null) continue
    const one = pageTypeStatedAt(relPath, text)
    if (one !== null) made.set(relPath, one)
  }
  return made
}

function overTheIndex(tree: FileTree): boolean {
  const root = tree.root
  if (root === undefined) return false
  return canonicalize(root) === canonicalize(akashaRoot())
}

export function indexedPaths(
  tree: FileTree,
  kinds: ReadonlySet<string>,
  globs: readonly string[]
): readonly string[] {
  const found = new Set<string>()
  if (overTheIndex(tree)) {
    for (const one of loadPages()) {
      if (!kinds.has(one.type)) continue
      if (tree.roots !== undefined && tree.roots[one.repo] === undefined) continue
      found.add(one.key)
    }
  }
  for (const relPath of [...tree.paths(globsIn(tree.roots, globs)), ...(tree.pending ?? [])]) {
    const kind = pageTypeOf(relPath)
    if (kind !== null && kinds.has(kind)) found.add(relPath)
  }
  return [...found].sort()
}

function pageTypePaths(tree: FileTree): readonly string[] {
  return indexedPaths(tree, PAGE_TYPE_KINDS, PAGE_TYPE_GLOBS)
}

function statedRegistry(tree: FileTree): readonly StatedPageType[] {
  const relPaths = pageTypePaths(tree)
  const stated = statedOver(relPaths, tree)
  const said: StatedPageType[] = []
  for (const relPath of relPaths) {
    const one = stated.get(relPath)
    if (one !== undefined) said.push(one)
  }
  return said
}
