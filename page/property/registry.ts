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

/**
 * What the held registry was built from, beside the tree's own mark.
 *
 * THE INDEX IS AN INPUT NOW, so a mark taken over the page-type folders alone would hold an answer
 * past the index moving under it. A page type may stand anywhere — `page-type` says its own page
 * lives where its domain lives — so there is no folder to watch in its place.
 *
 * THE ROWS ARE WHAT IS STAMPED, RATHER THAN THE RECORD OF WHAT THE INDEX WAS BUILT OVER. What the
 * registry is read out of is `loadPages`, so the rows are the input; `built-from.json` stood in for
 * them only because a landing rewrote it every time. A landing that cannot show it is all that has
 * moved now leaves that record alone and still writes the rows, so a stamp taken over the record
 * would hold a registry from before them — and `declarations` and `frontmatter` key on this too.
 */
export function indexStamp(): string {
  return createHash("sha256").update(rowsStamp()).digest("hex").slice(0, 16)
}

/**
 * A registry naming no page type at all, which is a tree whose page types went unread rather than
 * one that declares none: every repository this runs over states its own page types.
 */
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

/**
 * Every page of these kinds this tree holds: what the index carries, what the tree holds, and what
 * this write changes.
 *
 * THE INDEX AND THE TREE BOTH, BECAUSE NEITHER COVERS THE OTHER. The index reaches a page filed
 * beside its own domain, which no folder glob names — the readout four, the graph seven — and a
 * type extending one of them broke its chain when only the globs were read. The tree reaches a page
 * standing in a repository the index was not built over, which is every fixture repo: the index is
 * read under the root `AKASHA_ROOT` names and never a temp one, so a page type invented in a fixture
 * was no page type at all, `whereFor` found no type, and `writePage` answered null having written
 * nothing and said nothing.
 *
 * THE PENDING PATHS ARE UNIONED IN, because the index answers for what has landed and a gate judges
 * what has not. A path this write takes away wants no subtracting: the caller opens each one
 * against the proposed tree, which answers null for a page that is going.
 */
/**
 * Whether the index answers for this tree.
 *
 * THE INDEX IS BUILT OVER ONE CHECKOUT, the one `AKASHA_ROOT` names, and it carries that
 * checkout's paths and no others. A tree standing anywhere else holds none of them: a fixture
 * written into a temp directory, or one composed in memory that names no root at all. Folded into
 * such a tree the index hands it every path the real akasha holds, `open` answers null for each,
 * and `declaredOver` reads each null as a declaration the tree could not produce and refuses the
 * whole reading over — 2288 of them against a fixture holding twenty.
 *
 * A TREE THAT NAMES NO ROOT STANDS OVER NO CHECKOUT, which is the reading `composed` and every
 * held answer already take of an absent `root`.
 */
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
