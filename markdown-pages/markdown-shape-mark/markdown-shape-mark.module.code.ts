import { createHash } from "node:crypto"
import { existsSync } from "node:fs"
import { gitCapped } from "@akasha/git/git-capping"
import { AKASHA, akashaRoot, repos } from "@akasha/pages-system/checkout-roots"
import type { Roots } from "@akasha/pages-system/markdown-page-at"
import type { FileTree } from "../markdown-file-tree/markdown-file-tree.module.code.ts"
import {
  folderIn,
  PAGE_SHAPE_GLOBS,
} from "../markdown-page-types/markdown-page-types.module.code.ts"
import { RUNTIME_MARK } from "../markdown-runtime-mark/markdown-runtime-mark.module.code.ts"

// The code the answers were worked out by. A folder here is asked for its tree oid, so a change to
// any file under it moves the mark, and answers kept under the old one are left behind rather than
// served. `ownDirs` demands every name here resolve at HEAD, so one git does not hold takes the
// mark to null and turns the whole answer cache off for every reader in the checkout.
//
// MEASURED 2026-09-03 at 734da6c197. `page` and `refusal` were named here after 773aff3771 carried
// that code into `akasha/markdown-pages` and deleted both from HEAD. Both were left on disk as
// empty directories, so `existsSync` passed them and `git rev-parse HEAD:page` then failed: the
// mark was null for every reader here, and 156 kept registry answers were stranded under marks
// nothing works out any more. Absent from disk they would have failed `ownDirs` on the count
// instead, so the cache was off either way, and neither state says so out loud.
//
// WHAT THE MARK COVERS. The markdown page files reach it through `PAGE_SHAPE_GLOBS` and
// `PAGE_SHAPE_NAMED`, and every one of those ends `.md`. A `*.page-type.ts` under `akasha/` is in
// none of those folders and matches none of those names, so nothing about it reaches the mark.
// That is right while the registry reads markdown alone, and it is what has to change first if the
// registry is ever unioned to read the akasha half. Seeded and measured: renaming the slug inside a
// `.page-type.ts` left the mark at 7ab1fa35 and a union-shaped reader went on serving the old slug
// out of the cache, while the same rename in a `.page-type.md` moved the mark to 7ca4e6cf and the
// answer came back fresh. Stale there is a wrong answer rather than a refusal, and no reader
// outside could tell.
export const CODE_DIRS: readonly string[] = [
  "akasha/code-system/shape-progress",
  "akasha/command-system/during-call",
  "akasha/file-system/answer-keeping",
  "akasha/file-system/answer-mark",
  "akasha/file-system/exclusive",
  "akasha/markdown-pages",
  "akasha/pages-system/checkout-roots",
  "akasha/pages-system/pages/markdown-document",
  "akasha/pages-system/pages/markdown-page-at",
  "akasha/pages-system/pages/markdown-page-name",
  "akasha/pages-system/pages/markdown-page-type",
  "akasha/pages-system/repo-path",
  "akasha/utils-fs/atomic-write",
  "akasha/utils-fs/missing",
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
//
// The paths are then listed `--cached`, which asks the index against the commit and nothing about
// the disk. That is the question both callers have: it is the index the mark's named blobs are
// read out of, and it is the index a reader is being told to look at. The listing without it also
// carries the stale stat — a file rewritten with its own content, which `diff-index --quiet` calls
// a difference and no content ever backed — and that state is nobody's to act on, so it comes back
// here as no paths at all: the mark stands and nothing is said.
export function diskAtCommit(
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
  const listed = gitCapped(root, ["diff-index", "--cached", "--raw", "-z", "HEAD", "--", ...specs])
  if (listed.code !== 0) return null
  const fields = listed.stdout.split("\0").filter((one) => one !== "")
  if (fields.length % 2 !== 0) return null
  const staged = new Map<string, string>()
  for (let at = 0; at + 1 < fields.length; at += 2) {
    const meta = fields[at] as string
    const path = fields[at + 1] as string
    if (!meta.startsWith(":")) return null
    const oid = meta.slice(1).split(" ")[2]
    // The commit's side of the entry. A path staged as deleted, or staged that the commit has
    // never held, is refused rather than written into the mark as a blob nothing here stands on:
    // both are differences `git diff` reports too, so both were already refused above, and this
    // holds if git ever answers otherwise.
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

// GREP `SHAPE-MARK-INDEX-SKEW` and `SHAPE-MARK-PHANTOM-INDEX-ENTRY`. A dirty tree is the ordinary
// state of a working agent and says nothing. These two fire on the states that are not ordinary:
// the mark went on standing while the index disagreed with the commit under it. Each repeats at
// most once a minute per checkout and path set, because the state persists across every read until
// somebody clears it and a line per read would bury the first one.
const SKEW_SIGNAL = "SHAPE-MARK-INDEX-SKEW"
const PHANTOM_SIGNAL = "SHAPE-MARK-PHANTOM-INDEX-ENTRY"
const SAID_QUIET_MS = 60_000
const SAID_PATH_CEILING = 8

const toldOf = new Map<string, number>()

function toldLately(key: string): boolean {
  const now = Date.now()
  const before = toldOf.get(key)
  if (before !== undefined && now - before < SAID_QUIET_MS) return true
  toldOf.set(key, now)
  return false
}

function pathsShown(paths: readonly string[]): string {
  const left = paths.length - SAID_PATH_CEILING
  return `${paths.slice(0, SAID_PATH_CEILING).join(" ")}${left > 0 ? ` and ${left} more` : ""}`
}

function tellOfSkew(root: string, staged: ReadonlyMap<string, string>): void {
  const paths = [...staged.keys()].sort()
  if (paths.length === 0 || toldLately(`${SKEW_SIGNAL}\n${root}\n${paths.join("\n")}`)) return
  process.stderr.write(
    `${SKEW_SIGNAL} ${root}: ${paths.length} path(s) staged away from HEAD whose files on disk ` +
      `hold HEAD's own content: ${pathsShown(paths)}. The shape mark is taken from HEAD, so page ` +
      "answers stay cached. Read what is staged for those paths with `git diff --cached -- " +
      "<path>` and clear it with `git add -- <path>`, which restages the file as it stands.\n"
  )
}

function tellOfPhantom(root: string, paths: readonly string[]): void {
  if (paths.length === 0 || toldLately(`${PHANTOM_SIGNAL}\n${root}\n${paths.join("\n")}`)) return
  process.stderr.write(
    `${PHANTOM_SIGNAL} ${root}: ${paths.length} page path(s) are staged with no file under them, ` +
      `so the index holds content this checkout does not: ${pathsShown(paths)}. They are left ` +
      "out of the shape mark, which stands. Read what is staged for them with `git diff --cached " +
      "-- <path>` and clear each with `git update-index --force-remove -- <path>`, which takes " +
      "away that one index entry and touches no file.\n"
  )
}

// A NAMED BLOB IS ONLY WORTH THE FILE UNDER IT. `ls-files` reads the index, and the index holds
// paths this checkout has no file for: staged and then taken off the disk, which `diff-index
// --quiet HEAD` calls no difference at all, because the add and the delete cancel. So that state
// arrives here with a mark still being worked out, and writing its blob into the mark makes a mark
// that is wrong rather than absent — the worse of the two by far. Measured: seeding one moved this
// checkout's mark from fda5d46 to afde959 with every file on disk still the commit's own. Two
// checkouts holding identical files then work out different marks, which only costs a recompute;
// but a checkout where that path is real and committed works out the mark the phantom made, and is
// served answers taken from a tree that never held the file. That is the stale answer
// `namedAtCommit` refuses, arriving by the index instead of by a staged blob.
//
// A path with no file under it is therefore left out rather than refused, because leaving it out
// is not a guess: the mark that comes back is the one a checkout holding exactly these files works
// out, which is what a mark is for. It also cannot be a path the commit holds — a file the commit
// has and the disk has not is a deletion, which `diff-index --quiet` does report, and which took
// the mark to null long before this was reached. What is left out is only ever the phantom.
//
// `-z` is what makes the asking safe. Without it git quotes a path it thinks unusual, and
// `pages/café.page-type.md` comes back as `"pages/caf\303\251.page-type.md"`, which no `existsSync`
// will ever find. Dropping a real file from the mark is the very fault being closed here: nothing
// would move the mark when that file changed. There are none such in this checkout today, and one
// page named tomorrow would have been enough.
export function blobsNamed(root: string): ReadonlyMap<string, string> | null {
  const listed = gitCapped(root, ["ls-files", "-s", "-z", "--", ...PAGE_SHAPE_NAMED])
  if (listed.code !== 0) return null
  const blobs = new Map<string, string>()
  const phantoms: string[] = []
  for (const line of listed.stdout.split("\0")) {
    if (line === "") continue
    const [head, at] = line.split("\t")
    const oid = head?.split(" ")[1]
    if (at === undefined || oid === undefined) continue
    if (existsSync(`${root}/${at}`)) blobs.set(at, oid)
    else phantoms.push(at)
  }
  tellOfPhantom(root, phantoms.sort())
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
// A no is then asked once more, and only then, because `diff-index` says no to three states and
// only one of them is a changed tree: the others are a path staged away from the commit and a
// stale stat, and under both of those every file read here is the commit's. `diskAtCommit` is what
// separates them. It costs a second call on a path that was otherwise about to work every answer
// out afresh, and it answers null for the changed tree, which is the no this had all along.
function readAt(ask: Ask): Answered | null {
  let staged: ReadonlyMap<string, string> | null = null
  if (ask.cleanSpecs.length > 0) {
    const specs = [...new Set(ask.cleanSpecs)]
    if (!matchesCommit(ask.root, specs)) {
      if (ask.named && NAMED_TAILS === null) return null
      staged = diskAtCommit(ask.root, specs)
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
