import { answeredWhole } from "./answer-cache.ts"
import { shapeMarkOf } from "../shape/mark.ts"
import type { FileTree } from "../file-tree.ts"
import { createHash } from "node:crypto"
/** `page-types.ts` exports a `pageTypeOf` of its own, which builds a record rather than naming a
 * file's page type; it is taken here under the name of what it does so the one that names a page
 * type keeps its own. */
import { folderIn, PAGE_TYPE_GLOBS, type PageType, pageTypeOf as pageTypeFrom, pageTypeStatedAt, type StatedPageType } from "../page-types.ts"
import { pageTypeOf } from "../../pages-system/page-type/page-type.ts"
import { builtFrom, loadPages } from "../index/store/store.ts"

/** The page kinds those globs name, taken off the globs so there is one list rather than two. */
const PAGE_TYPE_KINDS: ReadonlySet<string> = new Set(
  PAGE_TYPE_GLOBS.map((one) => folderIn(one).split("/").pop() ?? "")
)

const registries = new WeakMap<FileTree, readonly PageType[]>()

export function registryOf(tree: FileTree): readonly PageType[] {
  const held = registries.get(tree)
  if (held !== undefined) return held
  const made = heldRegistry(tree)
  registries.set(tree, made)
  return made
}

/**
 * What the held registry was built from, beside the tree's own mark.
 *
 * THE INDEX IS AN INPUT NOW, so a mark taken over the page-type folders alone would hold an answer
 * past the index moving under it. A page type may stand anywhere — `page-type` says its own page
 * lives where its domain lives — so there is no folder to watch in its place.
 */
function indexStamp(): string {
  const held = builtFrom()
  if (held === null) return "none"
  return createHash("sha256").update(JSON.stringify(held)).digest("hex").slice(0, 16)
}

function heldRegistry(tree: FileTree): readonly PageType[] {
  const shape = shapeMarkOf(tree)
  const mark = shape === null ? null : `${shape}-${indexStamp()}`
  const root = tree.root
  const same = (one: readonly StatedPageType[]): readonly StatedPageType[] => one
  const stated =
    mark === null || root === undefined
      ? statedRegistry(tree)
      : answeredWhole(root, mark, "registry", () => statedRegistry(tree), same, same)
  return stated.map((one) => pageTypeFrom(one, tree.repoOf(one.slug)))
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

/**
 * Every page type this tree holds: what the index already carries, and what this write changes.
 *
 * READ OFF THE INDEX RATHER THAN GLOBBED. The globs named `pages/page-type/` and nothing else, so
 * the eleven page types filed beside their own domains — the readout four, the graph seven — were
 * invisible, and every type extending one of them broke its chain and stopped being a domain kind.
 *
 * THE PENDING PATHS ARE UNIONED IN, because the index answers for what has landed and a gate judges
 * what has not. A path this write takes away wants no subtracting: `statedOver` opens each one
 * against the proposed tree, which answers null for a page that is going.
 */
function pageTypePaths(tree: FileTree): readonly string[] {
  const found = new Set<string>()
  for (const one of loadPages()) {
    if (!PAGE_TYPE_KINDS.has(one.type)) continue
    if (tree.roots !== undefined && tree.roots[one.repo] === undefined) continue
    found.add(one.key)
  }
  for (const relPath of tree.pending ?? []) {
    const kind = pageTypeOf(relPath)
    if (kind !== null && PAGE_TYPE_KINDS.has(kind)) found.add(relPath)
  }
  return [...found].sort()
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
