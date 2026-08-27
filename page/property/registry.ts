import { answeredWhole } from "./answer-cache.ts"
import { shapeMarkOf } from "../shape/mark.ts"
import type { FileTree } from "../file-tree.ts"
import { pageTypeGlobsIn, type PageType, pageTypeOf, pageTypeStatedAt, type StatedPageType } from "../page-types.ts"

const registries = new WeakMap<FileTree, readonly PageType[]>()

export function registryOf(tree: FileTree): readonly PageType[] {
  const held = registries.get(tree)
  if (held !== undefined) return held
  const made = heldRegistry(tree)
  registries.set(tree, made)
  return made
}

function heldRegistry(tree: FileTree): readonly PageType[] {
  const mark = shapeMarkOf(tree)
  const root = tree.root
  const same = (one: readonly StatedPageType[]): readonly StatedPageType[] => one
  const stated =
    mark === null || root === undefined
      ? statedRegistry(tree)
      : answeredWhole(root, mark, "registry", () => statedRegistry(tree), same, same)
  return stated.map((one) => pageTypeOf(one, tree.repoOf(one.slug)))
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

function statedRegistry(tree: FileTree): readonly StatedPageType[] {
  const relPaths = tree.paths(pageTypeGlobsIn(tree.roots))
  const stated = statedOver(relPaths, tree)
  const said: StatedPageType[] = []
  for (const relPath of relPaths) {
    const one = stated.get(relPath)
    if (one !== undefined) said.push(one)
  }
  return said
}
