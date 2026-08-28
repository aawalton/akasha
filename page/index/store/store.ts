import { existsSync, mkdirSync, readFileSync, rmSync, rmdirSync, statSync } from "node:fs"
import { dirname, join } from "node:path"
import { markOf } from "../../../cache/mark/mark.ts"
import { exclusively } from "../../../exclusive/exclusive.ts"
import { canonicalize } from "../../../repo/path/path.ts"
import { REPOS, rootBeside } from "../../../repo/roots/roots.ts"
import { oidsUnder } from "../../../repo/oid/oid.ts"
import { writeWhole } from "../../../write-whole/write-whole.ts"
import type { Roots } from "../../page.ts"
import { pageNameOf } from "../../name/name.ts"
import {
  type Named,
  type Source,
  bodyOf,
  namedBodyOf,
  namedOf,
  saidNamed,
  saidSource,
  sourcesOf,
} from "../entry/entry.ts"
import type { Stated } from "../identity/identity.ts"
import type { Relation } from "../relation/relation.ts"
import { builtFromAt, identityFile, indexRoot, relationFileFor } from "../place/place.ts"

const KIND = "pages-index"

const NAME = "relation"

const PAGES = "pages.jsonl"

const RELATIONS = "relations.json"

export type BuiltFrom = Readonly<Record<string, string>>

/**
 * A directory whose last file has gone, taken away with it.
 *
 * `rmdirSync` takes away an empty directory and nothing else, so a directory another target still
 * has a file in raises ENOTEMPTY, and one already gone raises ENOENT. Both say there is nothing
 * here to take away, which is why neither is reported.
 */
function pruneEmpty(dir: string): void {
  try {
    rmdirSync(dir)
  } catch {
    // It holds a file still, or it is gone already.
  }
}

/**
 * A file's body, or null where nothing stands there.
 *
 * THE READ SETTLES IT RATHER THAN AN `existsSync` BEFORE IT. Asking whether a file is there
 * and then reading it are two calls, and a write that takes it away in between raises ENOENT
 * out of a reader that had just been told it existed. Every index reader runs unlocked while
 * writers remove files, so that gap is reachable whenever a page stops being reached at all.
 */
function bodyOrGone(at: string): string | null {
  try {
    return readFileSync(at, "utf8")
  } catch (failed) {
    if ((failed as NodeJS.ErrnoException).code === "ENOENT") return null
    throw failed
  }
}

export function sourcesAt(relation: string, target: string): readonly Source[] {
  const text = bodyOrGone(relationFileFor(relation, target))
  return text === null ? [] : sourcesOf(text)
}

export function keepAt(relation: string, target: string, sources: readonly Source[]): void {
  const at = relationFileFor(relation, target)
  const dir = dirname(at)
  if (sources.length === 0) {
    if (existsSync(at)) rmSync(at)
    pruneEmpty(dir)
    return
  }
  mkdirSync(dir, { recursive: true })
  writeWhole(at, bodyOf(sources))
}

/**
 * One relation file read, changed and written back as a single critical section.
 *
 * THE LOCK COVERS THE READ AS WELL AS THE WRITE. Reading with `sourcesAt` and writing with
 * `keepAt` is a read-modify-write, and two landings running it over one file at once each wrote
 * back what it had read before the other's entry was there, so one entry went with nothing saying
 * so. A lock inside `keepAt` alone would not have caught it: the file is read before that call.
 *
 * IT IS HELD ON THE DIRECTORY RATHER THAN THE FILE, because `keepAt` takes an emptied directory
 * away, and a lock standing inside that directory is exactly what would keep it there.
 */
export function updateAt(
  relation: string,
  target: string,
  change: (sources: readonly Source[]) => readonly Source[]
): void {
  const dir = dirname(relationFileFor(relation, target))
  mkdirSync(dirname(dir), { recursive: true })
  exclusively(dir, () => {
    keepAt(relation, target, change(sourcesAt(relation, target)))
  })
}

export function namedIn(file: string): readonly Named[] {
  const text = bodyOrGone(file)
  return text === null ? [] : namedOf(text)
}

export function keepNamedIn(file: string, held: readonly Named[]): void {
  if (held.length === 0) {
    if (existsSync(file)) rmSync(file)
    return
  }
  const sorted = [...held].sort((one, two) => (saidNamed(one) < saidNamed(two) ? -1 : 1))
  mkdirSync(dirname(file), { recursive: true })
  writeWhole(file, namedBodyOf(sorted))
}

/**
 * One identity file read, changed and written back as a single critical section, as `updateAt` is
 * for a relation file and for the same reason.
 *
 * A `change` ANSWERING NULL LEAVES THE FILE WHERE IT IS. Most landings re-state handles the file
 * already holds, and rewriting every one of those would be a write per landed page for no
 * difference in what the file says.
 */
export function updateNamedIn(
  file: string,
  change: (held: readonly Named[]) => readonly Named[] | null
): void {
  const dir = dirname(file)
  mkdirSync(dirname(dir), { recursive: true })
  exclusively(dir, () => {
    const made = change(namedIn(file))
    if (made === null) return
    keepNamedIn(file, made)
  })
}

export function pagesNamed(word: string, at: string): readonly Source[] {
  const found: Source[] = []
  for (const one of namedIn(identityFile(word, at))) {
    if (one.at !== at) continue
    found.push({ repo: one.repo, key: one.key })
  }
  return found
}

export function markFor(root: string): string {
  const inputs: { path: string; oid: string }[] = []
  for (const [key, oid] of oidsUnder(root, null)) {
    if (pageNameOf(key) === null) continue
    inputs.push({ path: key, oid })
  }
  return markOf(KIND, NAME, process.version, inputs)
}

export function marksOver(roots: Roots): BuiltFrom {
  const made: Record<string, string> = {}
  // WALKED BY REPOSITORY NAME RATHER THAN BY KEY. `Roots` carries a `target` key beside the roots,
  // whose value is a repository name and not a path, so an entries walk handed `git -C akasha` and
  // threw on a directory of that name not being there.
  for (const repo of REPOS) {
    const root = roots[repo]
    if (root === undefined) continue
    made[repo] = markFor(root)
  }
  return made
}

export function builtFrom(): BuiltFrom | null {
  const at = builtFromAt()
  if (!existsSync(at)) return null
  let held: unknown = null
  try {
    held = JSON.parse(readFileSync(at, "utf8"))
  } catch {
    return null
  }
  if (held === null || typeof held !== "object") return null
  const made: Record<string, string> = {}
  for (const [repo, mark] of Object.entries(held as Record<string, unknown>)) {
    if (typeof mark === "string") made[repo] = mark
  }
  return made
}

export function keepBuiltFrom(marks: BuiltFrom): void {
  fresh.clear()
  const at = builtFromAt()
  mkdirSync(dirname(at), { recursive: true })
  writeWhole(at, JSON.stringify(marks))
}

const fresh = new Map<string, boolean>()

export function indexReaches(repo: string, root: string): boolean {
  return canonicalize(rootBeside(repo)) === canonicalize(root)
}

/**
 * Whether the index's rows for one repository still describe the tree standing there.
 *
 * THE ANSWER IS HELD FOR THE LIFE OF THE PROCESS. `markFor` walks the whole repository through
 * git and costs on the order of a tenth of a second, and a read path asks this once per build
 * context, so a repeated answer would be paid for many times over in one command. The tree does
 * not move under a running command; where a command writes the index itself, `keepBuiltFrom` and
 * `emptyIndex` drop what is held.
 *
 * A repository the index was never built over reads as NOT fresh, which is the same answer a
 * drifted one gets and wants the same treatment: read the tree instead of the rows.
 */
export function indexFreshFor(repo: string, root: string): boolean {
  const at = `${repo}\n${root}`
  const had = fresh.get(at)
  if (had !== undefined) return had
  const held = builtFrom()
  const now = held !== null && held[repo] === markFor(root)
  fresh.set(at, now)
  return now
}

export function staleIn(roots: Roots): readonly string[] {
  const held = builtFrom()
  const named = REPOS.filter((repo) => roots[repo] !== undefined)
  if (held === null) return named
  const behind: string[] = []
  for (const repo of named) {
    const root = roots[repo]
    if (root === undefined) continue
    if (held[repo] !== markFor(root)) behind.push(repo)
  }
  return behind
}

type HeldPages = { readonly stamp: string; readonly pages: readonly Stated[] }

let heldPages: HeldPages | null = null

function stampOf(at: string): string {
  try {
    const one = statSync(at)
    return `${one.mtimeMs}:${one.size}`
  } catch {
    return ""
  }
}

function pagesAt(): string {
  return join(indexRoot(), PAGES)
}

function relationsAt(): string {
  return join(indexRoot(), RELATIONS)
}

/**
 * One critical section over the whole index.
 *
 * IT COVERS THE READ AS WELL AS THE WRITE. A landing reads every row with `loadPages`, works
 * out what it changes, and writes every row back with `keepPages`. Two landings running that
 * at once each write back the rows they read before the other's page was among them, so one
 * page's row goes with nothing saying so. That is not a theory: a subagent page landed at
 * 19:32:03 on 2026-08-27 and its row was still missing seventeen minutes later, with the
 * nearest rebuild twenty-two minutes before it — no rebuild was anywhere near.
 *
 * THE LOCK STANDS BESIDE THE INDEX ROOT RATHER THAN INSIDE IT. `emptyIndex` takes the whole
 * root away, and a lock standing inside it would go with it while its holder still ran.
 */
/**
 * How long a landing waits for the index before it refuses.
 *
 * SHORTER THAN THE TIGHTEST DEADLINE OVER A LANDING. `settings/agents.json` kills the errand
 * hook at ten seconds and the subagent hooks at fifteen, and a landing runs inside those. A
 * budget longer than they are would be spent being killed rather than refusing, and the
 * refusal is the whole point. Measured worst case for one hold is a quarter of a second, so
 * eight seconds is about thirty holds deep — far past anything observed.
 */
const INDEX_WAIT_MS = 8_000

export function underIndexLock<T>(act: () => T): T {
  const at = indexRoot()
  mkdirSync(dirname(at), { recursive: true })
  return exclusively(at, act, INDEX_WAIT_MS)
}

export function keepPages(stated: Iterable<Stated>): void {
  const held = [...stated].sort((one, two) =>
    saidSource(one) < saidSource(two) ? -1 : saidSource(one) > saidSource(two) ? 1 : 0
  )
  const lines: string[] = []
  for (const one of held) lines.push(JSON.stringify(one))
  const at = pagesAt()
  mkdirSync(dirname(at), { recursive: true })
  writeWhole(at, lines.length === 0 ? "" : `${lines.join("\n")}\n`)
  heldPages = { stamp: stampOf(at), pages: held }
}

export function loadPages(): readonly Stated[] {
  const at = pagesAt()
  const stamp = stampOf(at)
  if (heldPages !== null && heldPages.stamp === stamp) return heldPages.pages
  if (!existsSync(at)) return []
  const found: Stated[] = []
  for (const line of readFileSync(at, "utf8").split("\n")) {
    if (line === "") continue
    try {
      found.push(JSON.parse(line) as Stated)
    } catch {
      continue
    }
  }
  heldPages = { stamp, pages: found }
  return found
}

export function keepRelations(relations: ReadonlyMap<string, readonly Relation[]>): void {
  const at = relationsAt()
  mkdirSync(dirname(at), { recursive: true })
  writeWhole(at, JSON.stringify(Object.fromEntries(relations)))
}

export function loadRelations(): ReadonlyMap<string, readonly Relation[]> {
  const at = relationsAt()
  if (!existsSync(at)) return new Map()
  try {
    const held = JSON.parse(readFileSync(at, "utf8")) as Record<string, readonly Relation[]>
    return new Map(Object.entries(held))
  } catch {
    return new Map()
  }
}

export function emptyIndex(): void {
  fresh.clear()
  heldPages = null
  const at = indexRoot()
  if (existsSync(at)) rmSync(at, { recursive: true, force: true })
}
