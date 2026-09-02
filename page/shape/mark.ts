import { createHash } from "node:crypto"
import { existsSync } from "node:fs"
import { AKASHA, akashaRoot, repos } from "@akasha/pages-system/checkout-roots"
import type { Roots } from "@akasha/pages-system/markdown-page-at"
import { gitCapped } from "../../repo/git/git.ts"
import type { FileTree } from "../file-tree.ts"
import { folderIn, PAGE_SHAPE_GLOBS } from "../page-types.ts"
import { RUNTIME_MARK } from "../runtime/runtime.ts"

export const CODE_DIRS: readonly string[] = [
  "akasha/code-system/shape-progress",
  "akasha/command-system/during-call",
  "akasha/file-system/answer-keeping",
  "akasha/file-system/answer-mark",
  "akasha/file-system/exclusive",
  "akasha/pages-system/checkout-roots",
  "akasha/pages-system/pages/markdown-document",
  "akasha/pages-system/pages/markdown-page-at",
  "akasha/pages-system/pages/markdown-page-name",
  "akasha/pages-system/pages/markdown-page-type",
  "akasha/pages-system/repo-path",
  "akasha/utils-fs/atomic-write",
  "akasha/utils-fs/missing",
  "page",
  "refusal",
  "repo",
]

const PAGE_SHAPE_NAMED: readonly string[] = [
  ...new Set(PAGE_SHAPE_GLOBS.map((one) => one.slice(one.lastIndexOf("/") + 1))),
]

interface Ground {
  readonly base: string
}

// What one checkout is asked for. A root is asked once, however many repositories or code
// folders stand in it, because every `git` here loads the whole index — 17MB in this checkout —
// and that load, not the answer, is what a call costs. `diff-index` over the sixteen code
// folders, over the six shape folders and over the six shape names measured 103ms, 63ms and
// 144ms apart and 156ms together, so asking three times spends 154ms on nothing but re-reading
// an index that had not changed between the reads.
interface Ask {
  readonly root: string
  readonly oidDirs: string[]
  readonly cleanSpecs: string[]
  named: boolean
}

interface Answered {
  readonly oids: ReadonlyMap<string, string>
  readonly named: ReadonlyMap<string, string>
}

function presentIn(root: string, globs: readonly string[]): readonly string[] {
  return [...new Set(globs.map(folderIn))].filter((at) => existsSync(`${root}/${at}`)).sort()
}

function recordedAt(root: string, dirs: readonly string[]): readonly string[] | null {
  const found = gitCapped(root, ["rev-parse", ...dirs.map((at) => `HEAD:${at}`)])
  if (found.code !== 0) return null
  const oids = found.stdout.split("\n").filter((one) => one !== "")
  return oids.length === dirs.length ? oids : null
}

function matchesCommit(root: string, specs: readonly string[]): boolean {
  return gitCapped(root, ["diff-index", "--quiet", "HEAD", "--", ...specs]).code === 0
}

function blobsNamed(root: string): ReadonlyMap<string, string> | null {
  const listed = gitCapped(root, ["ls-files", "-s", "--", ...PAGE_SHAPE_NAMED])
  if (listed.code !== 0) return null
  const blobs = new Map<string, string>()
  for (const line of listed.stdout.split("\n")) {
    if (line === "") continue
    const [head, at] = line.split("\t")
    const oid = head?.split(" ")[1]
    if (at !== undefined && oid !== undefined) blobs.set(at, oid)
  }
  return blobs
}

// The asks a checkout stands under, one entry per root. `askFor` is what merges them: two
// repositories in one checkout, or the code folders and the shape folders of the same one, come
// back as a single entry and so cost a single load of that index.
function askFor(asks: Map<string, Ask>, root: string): Ask {
  const held = asks.get(root)
  if (held !== undefined) return held
  const made: Ask = { root, oidDirs: [], cleanSpecs: [], named: false }
  asks.set(root, made)
  return made
}

// Cleanliness is asked first and alone, because it is the answer that says no. A checkout with
// any of this uncommitted has no mark, and finding that out costs one call rather than the two
// or three it took to reach the same no before.
function readAt(ask: Ask): Answered | null {
  if (ask.cleanSpecs.length > 0 && !matchesCommit(ask.root, [...new Set(ask.cleanSpecs)]))
    return null
  const oids = new Map<string, string>()
  const dirs = [...new Set(ask.oidDirs)]
  if (dirs.length > 0) {
    const found = recordedAt(ask.root, dirs)
    if (found === null) return null
    dirs.forEach((at, index) => oids.set(at, found[index] as string))
  }
  if (!ask.named) return { oids, named: new Map() }
  const named = blobsNamed(ask.root)
  return named === null ? null : { oids, named }
}

function answeredFor(asks: ReadonlyMap<string, Ask>): ReadonlyMap<string, Answered> | null {
  const done = new Map<string, Answered>()
  for (const ask of asks.values()) {
    const one = readAt(ask)
    if (one === null) return null
    done.set(ask.root, one)
  }
  return done
}

// An oid that is not there is answered as no ground rather than written into the mark as the
// word `undefined`. Two checkouts standing apart would otherwise carry the same mark and one
// would be handed the other's answer.
function partsFor(
  done: ReadonlyMap<string, Answered>,
  root: string,
  dirs: readonly string[],
  under: string
): readonly string[] | null {
  const oids = done.get(root)?.oids
  if (oids === undefined) return null
  const parts: string[] = []
  for (const at of dirs) {
    const oid = oids.get(at)
    if (oid === undefined) return null
    parts.push(`${under}${at}:${oid}`)
  }
  return parts
}

// The code the reading is done by stands in whichever checkout this process runs out of, which
// is not always the root the tree is read over, so it is asked for by its own root.
function ownDirs(): readonly string[] | null {
  const dirs = presentIn(akashaRoot(), CODE_DIRS)
  return dirs.length === CODE_DIRS.length ? dirs : null
}

export function groundOverCommit(root: string): Ground | null {
  const dirs = presentIn(root, PAGE_SHAPE_GLOBS)
  if (dirs.length === 0) return null
  const code = ownDirs()
  if (code === null) return null
  const asks = new Map<string, Ask>()
  const over = askFor(asks, root)
  over.oidDirs.push(...dirs)
  over.cleanSpecs.push(...dirs)
  const here = askFor(asks, akashaRoot())
  here.oidDirs.push(...code)
  here.cleanSpecs.push(...code)
  const done = answeredFor(asks)
  if (done === null) return null
  const shape = partsFor(done, root, dirs, "")
  const own = partsFor(done, akashaRoot(), code, `${AKASHA}/`)
  if (shape === null || own === null) return null
  return { base: [...shape, ...own, RUNTIME_MARK].join("\n") }
}

export function groundSpanning(roots: Roots): Ground | null {
  const code = ownDirs()
  if (code === null) return null
  const asks = new Map<string, Ask>()
  const here = askFor(asks, akashaRoot())
  here.oidDirs.push(...code)
  here.cleanSpecs.push(...code)
  const shaped = new Map<string, readonly string[]>()
  for (const repo of repos()) {
    const root = roots[repo]
    if (root === undefined) continue
    const one = askFor(asks, root)
    one.named = true
    one.cleanSpecs.push(...PAGE_SHAPE_NAMED)
    const dirs = presentIn(root, PAGE_SHAPE_GLOBS)
    shaped.set(repo, dirs)
    one.oidDirs.push(...dirs)
    one.cleanSpecs.push(...dirs)
  }
  const done = answeredFor(asks)
  if (done === null) return null
  const parts: string[] = []
  const held = new Set<string>()
  for (const repo of repos()) {
    const root = roots[repo]
    if (root === undefined) continue
    const one = done.get(root)
    if (one === undefined) return null
    for (const at of [...one.named.keys()].sort()) {
      parts.push(`${repo}/${at}:${one.named.get(at)}`)
      held.add(at)
    }
    const shape = partsFor(done, root, shaped.get(repo) ?? [], `${repo}/`)
    if (shape === null) return null
    parts.push(...shape)
  }
  if (held.size === 0) return null
  const own = partsFor(done, akashaRoot(), code, `${AKASHA}/`)
  if (own === null) return null
  parts.push(...own, RUNTIME_MARK)
  return { base: parts.join("\n") }
}

const grounds = new WeakMap<FileTree, Ground | null>()

function groundOf(tree: FileTree): Ground | null {
  const held = grounds.get(tree)
  if (held !== undefined) return held
  const root = tree.root
  const spanned = tree.roots
  const made =
    (tree.pending?.size ?? 0) > 0
      ? null
      : spanned !== undefined
        ? groundSpanning(spanned)
        : root === undefined
          ? null
          : groundOverCommit(root)
  grounds.set(tree, made)
  return made
}

export function shapeMarkOf(tree: FileTree): string | null {
  const ground = groundOf(tree)
  return ground === null ? null : createHash("sha256").update(ground.base).digest("hex")
}
