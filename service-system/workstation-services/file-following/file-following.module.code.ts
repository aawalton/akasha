import { type FSWatcher, readdirSync, readFileSync, watch } from "node:fs"
import { dirname, join } from "node:path"

export const SETTLE_MS = 1_000

const GONE = "gone"

export type Digest = ReadonlyMap<string, string>

export type Following = {
  readonly stop: () => undefined
  readonly unfollowed: readonly string[]
}

export function digestOf(files: Iterable<string>): Digest {
  const held = new Map<string, string>()
  for (const at of files) {
    try {
      held.set(at, Bun.hash(readFileSync(at)).toString(16))
    } catch {
      held.set(at, GONE)
    }
  }
  return held
}

export function movedBetween(before: Digest, after: Digest): readonly string[] {
  const moved: string[] = []
  for (const [at, hash] of after) if (before.get(at) !== hash) moved.push(at)
  for (const at of before.keys()) if (!after.has(at)) moved.push(at)
  return moved.sort()
}

export function dirsOf(files: Iterable<string>): ReadonlySet<string> {
  const dirs = new Set<string>()
  for (const at of files) dirs.add(dirname(at))
  return dirs
}

// What the folders hold at this moment that `holds` admits. Taken again at every weighing, so a
// file that appears is weighed from then on and a file that goes drops out of the weighing.
export function filesWithin(
  folders: Iterable<string>,
  holds: (at: string) => boolean
): ReadonlySet<string> {
  const found = new Set<string>()
  for (const dir of folders) {
    let names: readonly string[]
    try {
      names = readdirSync(dir)
    } catch {
      continue
    }
    for (const name of names) {
      const at = join(dir, name)
      if (holds(at)) found.add(at)
    }
  }
  return found
}

function follow(
  dirs: Iterable<string>,
  weigh: () => Digest,
  moved: (what: readonly string[]) => undefined,
  settleMs: number,
  from: Digest | undefined
): Following {
  let digested = from ?? weigh()
  let settling: ReturnType<typeof setTimeout> | null = null
  const following: FSWatcher[] = []
  const unfollowed: string[] = []
  const settle = (): undefined => {
    if (settling !== null) clearTimeout(settling)
    settling = setTimeout(() => {
      settling = null
      const now = weigh()
      const what = movedBetween(digested, now)
      digested = now
      if (what.length > 0) moved(what)
    }, settleMs)
  }
  for (const dir of dirs) {
    try {
      following.push(watch(dir, settle))
    } catch {
      unfollowed.push(dir)
    }
  }
  settle()
  return {
    stop: () => {
      if (settling !== null) clearTimeout(settling)
      for (const one of following) one.close()
    },
    unfollowed: unfollowed.sort(),
  }
}

// Follow a set named file by file. A file appearing beside one of them is no part of the set and
// is not answered, so this suits a set that is known whole and does not grow.
export function followFiles(
  files: ReadonlySet<string>,
  moved: (what: readonly string[]) => undefined,
  settleMs: number = SETTLE_MS,
  from?: Digest
): Following {
  return follow(dirsOf(files), () => digestOf(files), moved, settleMs, from)
}

// Follow whole folders. What is weighed is worked out again at every settle, so this suits a set
// that grows and shrinks while the watch runs, as a folder of seats does.
export function followWithin(
  folders: ReadonlySet<string>,
  holds: (at: string) => boolean,
  moved: (what: readonly string[]) => undefined,
  settleMs: number = SETTLE_MS,
  from?: Digest
): Following {
  return follow(folders, () => digestOf(filesWithin(folders, holds)), moved, settleMs, from)
}

const TICK = "tick"

// A weighing that never matches the one before it, so every settled event is answered.
function ticking(): () => Digest {
  let beat = 0
  return () => new Map([[TICK, String((beat += 1))]])
}

// Follow whole folders and answer on any event in them, reading nothing they hold. This suits a
// folder written far more often, and holding far more, than reading it is worth: the event is the
// whole answer, and what changed is left to the caller to work out at its own pace.
export function followFolders(
  folders: ReadonlySet<string>,
  moved: (what: readonly string[]) => undefined,
  settleMs: number = SETTLE_MS
): Following {
  const named = [...folders].sort()
  return follow(folders, ticking(), () => moved(named), settleMs, undefined)
}
