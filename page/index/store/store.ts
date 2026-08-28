import {
  type Dirent,
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  rmdirSync,
  statSync,
} from "node:fs"
import { dirname, join } from "node:path"
import { markOf } from "../../../cache/mark/mark.ts"
import { exclusively } from "../../../exclusive/exclusive.ts"
import { canonicalize } from "../../../repo/path/path.ts"
import { rootBeside } from "../../../repo/roots/roots.ts"
import { oidsUnder } from "../../../repo/oid/oid.ts"
import { writeWhole } from "../../../write-whole/write-whole.ts"
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
import {
  builtFromAt,
  identityFile,
  identityRoot,
  indexRoot,
  relationFileFor,
  relationsRoot,
} from "../place/place.ts"

const KIND = "pages-index"

const NAME = "relation"

const PAGES = "pages.jsonl"

const RELATIONS = "relations.json"

export type BuiltFrom = Readonly<Record<string, string>>

/**
 * Every directory a file's going has emptied, taken away, up to `root`.
 *
 * IT CLIMBS RATHER THAN TAKING ONE LEVEL. A relation tree for a file target nests as deep as
 * ten segments, so taking away only the directory the file sat in leaves every parent above it
 * standing empty for good. Nothing showed that while a rebuild removed the whole root each
 * time: the leak was swept up before anyone could count it.
 *
 * `rmdirSync` takes away an empty directory and nothing else, so a directory another target
 * still has a file in raises ENOTEMPTY, and one already gone raises ENOENT. Both say there is
 * nothing more to take away here, which is why neither is reported and why the climb stops.
 */
function pruneUpTo(dir: string, root: string): void {
  let at = dir
  while (at.startsWith(`${root}/`)) {
    try {
      rmdirSync(at)
    } catch {
      return
    }
    at = dirname(at)
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
    rmSync(at, { force: true })
    pruneUpTo(dir, relationsRoot())
    return
  }
  mkdirSync(dir, { recursive: true })
  writeWhole(at, bodyOf(sources))
}

/**
 * One relation file read, changed and written back.
 *
 * NO LOCK OF ITS OWN. Reading with `sourcesAt` and writing with `keepAt` is a read-modify-write,
 * and it carried a lock on the file's directory back when nothing above it did. `underIndexLock`
 * now covers the whole index for the whole of a landing and the whole of a rebuild's write, and
 * every caller of this stands inside one. A second lock underneath would cost a directory made
 * and taken away for every relation file a landing touches, and guard nothing not guarded above.
 */
export function updateAt(
  relation: string,
  target: string,
  change: (sources: readonly Source[]) => readonly Source[]
): void {
  keepAt(relation, target, change(sourcesAt(relation, target)))
}

export function namedIn(file: string): readonly Named[] {
  const text = bodyOrGone(file)
  return text === null ? [] : namedOf(text)
}

export function keepNamedIn(file: string, held: readonly Named[]): void {
  if (held.length === 0) {
    rmSync(file, { force: true })
    pruneUpTo(dirname(file), identityRoot())
    return
  }
  const sorted = [...held].sort((one, two) => (saidNamed(one) < saidNamed(two) ? -1 : 1))
  mkdirSync(dirname(file), { recursive: true })
  writeWhole(file, namedBodyOf(sorted))
}

/**
 * One identity file read, changed and written back, inside `underIndexLock` as `updateAt` is
 * and for the same reason.
 *
 * A `change` ANSWERING NULL LEAVES THE FILE WHERE IT IS. Most landings re-state handles the file
 * already holds, and rewriting every one of those would be a write per landed page for no
 * difference in what the file says.
 */
export function updateNamedIn(
  file: string,
  change: (held: readonly Named[]) => readonly Named[] | null
): void {
  const made = change(namedIn(file))
  if (made === null) return
  keepNamedIn(file, made)
}

export function pagesNamed(word: string, at: string): readonly Source[] {
  const found: Source[] = []
  for (const one of namedIn(identityFile(word, at))) {
    if (one.at !== at) continue
    found.push({ repo: one.repo, key: one.key })
  }
  return found
}

export function pageOidsIn(root: string): ReadonlyMap<string, string> {
  const made = new Map<string, string>()
  for (const [key, oid] of oidsUnder(root, null)) {
    if (pageNameOf(key) === null) continue
    made.set(key, oid)
  }
  return made
}

export function markFrom(oids: ReadonlyMap<string, string>): string {
  const inputs: { path: string; oid: string }[] = []
  for (const [path, oid] of oids) inputs.push({ path, oid })
  return markOf(KIND, NAME, process.version, inputs)
}

export function markFor(root: string): string {
  return markFrom(pageOidsIn(root))
}

export function marksFrom(oids: ReadonlyMap<string, ReadonlyMap<string, string>>): BuiltFrom {
  const made: Record<string, string> = {}
  for (const [repo, held] of oids) made[repo] = markFrom(held)
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
 * not move under a running command; where a command writes the index itself, `keepBuiltFrom`
 * drops what is held.
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


type HeldPages = { readonly at: string; readonly stamp: string; readonly pages: readonly Stated[] }

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

export function rowsStamp(): string {
  const at = pagesAt()
  return `${at}:${stampOf(at)}`
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
 * THE LOCK STANDS BESIDE THE INDEX ROOT RATHER THAN INSIDE IT, so that nothing rewriting the
 * tree under that root can take away a lock whose holder is still running.
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

function filesUnder(root: string): readonly string[] {
  const found: string[] = []
  const walk = (dir: string): void => {
    let held: Dirent[]
    try {
      held = readdirSync(dir, { withFileTypes: true })
    } catch {
      return
    }
    for (const one of held) {
      const at = join(dir, one.name)
      if (one.isDirectory()) walk(at)
      else found.push(at)
    }
  }
  walk(root)
  return found
}

/**
 * One subtree of the index brought to exactly the files named, and no others.
 *
 * ONLY WHAT DIFFERS IS WRITTEN. A rebuild used to take the whole index away and lay it down
 * again — around ten thousand files, and about two seconds in which the index did not exist at
 * all. Almost none of those files differ from one rebuild to the next, so reading them to find
 * out costs a fraction of writing them all, and at no instant is the index missing.
 */
function settleUnder(root: string, want: ReadonlyMap<string, string>): void {
  const emptied = new Set<string>()
  for (const at of filesUnder(root)) {
    if (want.has(at)) continue
    rmSync(at, { force: true })
    emptied.add(dirname(at))
  }
  for (const [at, body] of want) {
    if (bodyOrGone(at) === body) continue
    mkdirSync(dirname(at), { recursive: true })
    writeWhole(at, body)
  }
  for (const dir of emptied) pruneUpTo(dir, root)
}

/**
 * The bodies a settle will write, composed before the lock is taken.
 *
 * COMPOSED OUTSIDE THE LOCK BECAUSE NONE OF IT READS THE INDEX. Turning 124,782 relation
 * entries and 179,349 identity handles into 42MB of text is two thirds of what a rebuild
 * used to hold the lock for, and holding it across that made every landing in flight wait
 * on work whose answer does not depend on what the index holds. What the lock is for is the
 * read of the files and the write over them, which is what `settleUnder` is left with.
 */
export function relationBodies(
  want: ReadonlyMap<string, readonly Source[]>
): ReadonlyMap<string, string> {
  const bodies = new Map<string, string>()
  for (const [at, sources] of want) bodies.set(at, bodyOf(sources))
  return bodies
}

export function identityBodies(
  want: ReadonlyMap<string, readonly Named[]>
): ReadonlyMap<string, string> {
  const bodies = new Map<string, string>()
  for (const [at, held] of want) {
    const sorted = [...held].sort((one, two) => (saidNamed(one) < saidNamed(two) ? -1 : 1))
    bodies.set(at, namedBodyOf(sorted))
  }
  return bodies
}

export function settleRelationFiles(bodies: ReadonlyMap<string, string>): void {
  settleUnder(relationsRoot(), bodies)
}

export function settleIdentityFiles(bodies: ReadonlyMap<string, string>): void {
  settleUnder(identityRoot(), bodies)
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
  heldPages = { at, stamp: stampOf(at), pages: held }
}

/**
 * THE PATH IS PART OF WHAT THE ROWS ARE HELD AGAINST, not the stamp alone. `indexRoot` follows
 * `AKASHA_ROOT`, so one process reads one index and then another, and a modification time and a
 * size are something two different files can carry alike.
 */
export function loadPages(): readonly Stated[] {
  const at = pagesAt()
  const stamp = stampOf(at)
  if (heldPages !== null && heldPages.at === at && heldPages.stamp === stamp) return heldPages.pages
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
  heldPages = { at, stamp, pages: found }
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
