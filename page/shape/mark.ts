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

const NOT_IN_COMMIT = "0000000000000000000000000000000000000000"

const OBJECT_ID = /^[0-9a-f]{40}$/

// The named patterns are each a star and then a literal tail, `*.page-type.md` and its five
// siblings. git matches a pathspec holding no slash against the whole path and without
// FNM_PATHNAME, so one of those catches the name at any depth and the tail is the whole of what it
// asks — which makes `endsWith` the same question git asked. A pattern of any other shape is not
// guessed at: this answers null, and a checkout standing under staging skew is then refused a mark
// exactly as it was before, rather than handed one built on a pattern read wrongly.
function namedTails(): readonly string[] | null {
  const tails: string[] = []
  for (const one of PAGE_SHAPE_NAMED) {
    if (!one.startsWith("*")) return null
    const tail = one.slice(1)
    if (tail === "" || /[*?[\]]/.test(tail)) return null
    tails.push(tail)
  }
  return tails
}

const NAMED_TAILS = namedTails()

function amongNamed(at: string): boolean {
  return NAMED_TAILS !== null && NAMED_TAILS.some((tail) => at.endsWith(tail))
}

// STAGING SKEW IS NOT A DIRTY TREE. `diff-index` answers "does HEAD differ from the index or from
// the worktree", and those are two questions. A path staged away from HEAD whose file on disk
// holds HEAD's own content answers yes to the first and no to the second: every byte this tree is
// read out of is the commit's, so the mark taken from that commit is exactly right for it. Before
// this, such a path took the mark to null and the answer cache off for every agent in the
// checkout, at 0.5-1.6s of rework per page read, until somebody happened to notice — `git status`
// shows `MM` and `git diff HEAD` shows nothing at all, and neither says which of the two it is.
//
// The shape is easy to reach here rather than exotic. The commit rule names exact paths, so
// anything staged beside such a commit is left staged; and a worktree put back to HEAD under a
// staged blob lands in it directly.
//
// `git diff` is asked rather than `diff-index` because only it compares the file to the commit
// instead of comparing the staged blob to the commit. `diff.autorefreshindex=false` keeps that a
// read: the refresh it would otherwise do writes `.git/index`, and every agent in this checkout is
// already contending for that lock. Measured in a seeded checkout: 0 for this state under either
// setting of that config and with the lock held by somebody else, and 1 for a changed file, a
// deleted file, a mode change, and a file staged that the commit has never held.
export function stagedAwayFromCommit(
  root: string,
  specs: readonly string[]
): ReadonlyMap<string, string> | null {
  const onDisk = gitCapped(root, [
    "-c",
    "diff.autorefreshindex=false",
    "diff",
    "--quiet",
    "HEAD",
    "--",
    ...specs,
  ])
  if (onDisk.code !== 0) return null
  const listed = gitCapped(root, ["diff-index", "--raw", "-z", "HEAD", "--", ...specs])
  if (listed.code !== 0) return null
  const fields = listed.stdout.split("\0").filter((one) => one !== "")
  if (fields.length % 2 !== 0) return null
  const staged = new Map<string, string>()
  for (let at = 0; at + 1 < fields.length; at += 2) {
    const meta = fields[at] as string
    const path = fields[at + 1] as string
    if (!meta.startsWith(":")) return null
    const oid = meta.slice(1).split(" ")[2]
    // The commit's side of the entry. Nothing reaches here without one — a path staged as deleted
    // is a difference `git diff` reports too, and so was refused above — and a path the commit
    // does not hold is refused rather than written into the mark as a blob nothing stands on.
    if (oid === undefined || oid === NOT_IN_COMMIT || !OBJECT_ID.test(oid)) return null
    staged.set(path, oid)
  }
  return staged
}

// `blobsNamed` reads the index, which under staging skew is the one thing this checkout has wrong,
// so the paths it has wrong are written back to what the commit holds. Left uncorrected the mark
// would carry a blob that no file here holds, and a checkout that really did stand on that blob
// would be handed these answers — availability bought at the price of a wrong answer, which is the
// trade this must not make. Corrected, the mark is the one a clean checkout on this same commit
// works out, so the answers already kept under it are the answers this read wants.
//
// A staged path outside the named patterns is passed over rather than added. Every spec asked
// about is either a folder, whose ingredient is the commit's own tree oid and so already right, or
// one of those patterns; there is no third kind of path here to be wrong about.
export function namedAtCommit(
  named: ReadonlyMap<string, string>,
  staged: ReadonlyMap<string, string>
): ReadonlyMap<string, string> {
  const held = new Map(named)
  for (const [at, oid] of staged) if (amongNamed(at)) held.set(at, oid)
  return held
}

// GREP `SHAPE-MARK-INDEX-SKEW`. A dirty tree is the ordinary state of a working agent and says
// nothing, so this fires on the one state that is not ordinary: the mark went on standing while
// the index disagreed with the commit under it. It repeats at most once a minute per checkout and
// path set, because the state persists across every read until somebody clears it and a line per
// read would bury the first one.
const SKEW_SIGNAL = "SHAPE-MARK-INDEX-SKEW"
const SKEW_QUIET_MS = 60_000
const SKEW_NAMED_CEILING = 8

const toldOf = new Map<string, number>()

function tellOfSkew(root: string, staged: ReadonlyMap<string, string>): void {
  const paths = [...staged.keys()].sort()
  if (paths.length === 0) return
  const key = `${root}\n${paths.join("\n")}`
  const now = Date.now()
  const before = toldOf.get(key)
  if (before !== undefined && now - before < SKEW_QUIET_MS) return
  toldOf.set(key, now)
  const left = paths.length - SKEW_NAMED_CEILING
  const shown = paths.slice(0, SKEW_NAMED_CEILING).join(" ")
  const more = left > 0 ? ` and ${left} more` : ""
  process.stderr.write(
    `${SKEW_SIGNAL} ${root}: ${paths.length} path(s) staged away from HEAD whose files on disk ` +
      `hold HEAD's own content: ${shown}${more}. The shape mark is taken from HEAD, so page ` +
      "answers stay cached. Read what is staged for those paths with `git diff --cached -- " +
      "<path>` and clear it with `git add -- <path>`, which restages the file as it stands.\n"
  )
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
//
// A no is then asked once more, and only then, because `diff-index` says no to two states and only
// one of them is a changed tree. `stagedAwayFromCommit` is what separates them; it costs a second
// call on a path that was already going to work every answer out afresh, and it answers null for
// the changed tree, which is the no this had all along.
function readAt(ask: Ask): Answered | null {
  let staged: ReadonlyMap<string, string> | null = null
  if (ask.cleanSpecs.length > 0) {
    const specs = [...new Set(ask.cleanSpecs)]
    if (!matchesCommit(ask.root, specs)) {
      if (ask.named && NAMED_TAILS === null) return null
      staged = stagedAwayFromCommit(ask.root, specs)
      if (staged === null) return null
      tellOfSkew(ask.root, staged)
    }
  }
  const oids = new Map<string, string>()
  const dirs = [...new Set(ask.oidDirs)]
  if (dirs.length > 0) {
    const found = recordedAt(ask.root, dirs)
    if (found === null) return null
    dirs.forEach((at, index) => oids.set(at, found[index] as string))
  }
  if (!ask.named) return { oids, named: new Map() }
  const named = blobsNamed(ask.root)
  if (named === null) return null
  return { oids, named: staged === null ? named : namedAtCommit(named, staged) }
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
