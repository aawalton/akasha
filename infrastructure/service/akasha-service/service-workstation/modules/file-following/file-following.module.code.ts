import { type Dirent, type FSWatcher, readdirSync, readFileSync, watch } from "node:fs"
import { dirname, join } from "node:path"
import "akasha/temper/eso/type/eso-timers/eso-timers.type-declaration.d.ts"

const SETTLE_MS = 1_000

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

export function filesWithin(
  folders: Iterable<string>,
  holds: (at: string) => boolean,
  reach: number = 0
): ReadonlySet<string> {
  const found = new Set<string>()
  for (const dir of folders) {
    let names: readonly Dirent[]
    try {
      names = readdirSync(dir, { withFileTypes: true })
    } catch {
      continue
    }
    for (const one of names) {
      const at = join(dir, one.name)
      if (reach > 0 && one.isDirectory()) {
        for (const below of filesWithin([at], holds, reach - 1)) found.add(below)
        continue
      }
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
  from: Digest | undefined,
  recursive: boolean = false
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
      following.push(watch(dir, { recursive }, settle))
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

export function followWithin(
  folders: ReadonlySet<string>,
  holds: (at: string) => boolean,
  moved: (what: readonly string[]) => undefined,
  settleMs: number = SETTLE_MS,
  from?: Digest,
  reach: number = 0
): Following {
  const weigh = (): Digest => digestOf(filesWithin(folders, holds, reach))
  return follow(folders, weigh, moved, settleMs, from, reach > 0)
}

const TICK = "tick"

function ticking(): () => Digest {
  let beat = 0
  return () => {
    beat += 1
    return new Map([[TICK, String(beat)]])
  }
}

export function followFolders(
  folders: ReadonlySet<string>,
  moved: (what: readonly string[]) => undefined,
  settleMs: number = SETTLE_MS
): Following {
  const named = [...folders].sort()
  return follow(folders, ticking(), () => moved(named), settleMs, undefined)
}
