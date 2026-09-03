import { pageTypeOf } from "@akasha/pages-system/markdown-page-type"
import type { FileTree } from "../markdown-file-tree/markdown-file-tree.module.code.ts"
import {
  globsIn,
  PAGE_TYPE_GLOBS,
  PAGE_TYPE_KINDS,
  type PageType,
  pageTypeRecord,
  pageTypeStatedAt,
  type StatedPageType,
} from "../markdown-page-types/markdown-page-types.module.code.ts"
import { answeredWhole } from "../markdown-property-answer-cache/markdown-property-answer-cache.module.code.ts"
import { shapeMarkOf } from "../markdown-shape-mark/markdown-shape-mark.module.code.ts"

const registries = new WeakMap<FileTree, readonly PageType[]>()

export function registryOf(tree: FileTree): readonly PageType[] {
  const held = registries.get(tree)
  if (held !== undefined) return held
  const made = heldRegistry(tree)
  registries.set(tree, made)
  return made
}

const anyStated = (one: readonly StatedPageType[]): boolean => one.length > 0

function heldRegistry(tree: FileTree): readonly PageType[] {
  // The mark once carried the mtime and size of the index row file alongside the tree shape. There
  // is no row file, so the shape of the tree is the whole of what this answer stands on.
  const mark = shapeMarkOf(tree)
  const root = tree.root
  const same = (one: readonly StatedPageType[]): readonly StatedPageType[] => one
  const stated =
    mark === null || root === undefined
      ? statedRegistry(tree)
      : answeredWhole(root, mark, "registry", () => statedRegistry(tree), same, same, anyStated)
  return stated.map((one) => pageTypeRecord(one, tree.repoOf(one.slug)))
}

function statedOver(
  relPaths: readonly string[],
  tree: FileTree
): ReadonlyMap<string, StatedPageType> {
  const made = new Map<string, StatedPageType>()
  for (const relPath of relPaths) {
    const text = tree.open(relPath)
    if (text === null) continue
    const one = pageTypeStatedAt(relPath, text)
    if (one !== null) made.set(relPath, one)
  }
  return made
}

// This used to union the index rows over the akasha root with what the tree answers. The tree is
// now the only source, and it was always one of the two, so nothing here reads as an empty repo.
export function indexedPaths(
  tree: FileTree,
  kinds: ReadonlySet<string>,
  globs: readonly string[]
): readonly string[] {
  const found = new Set<string>()
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
