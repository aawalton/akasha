import { type FSWatcher, readFileSync, watch } from "node:fs"
import { dirname } from "node:path"

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

export function followFiles(
  files: ReadonlySet<string>,
  moved: (what: readonly string[]) => undefined,
  settleMs: number = SETTLE_MS,
  from?: Digest
): Following {
  let digested = from ?? digestOf(files)
  let settling: ReturnType<typeof setTimeout> | null = null
  const following: FSWatcher[] = []
  const unfollowed: string[] = []
  const settle = (): undefined => {
    if (settling !== null) clearTimeout(settling)
    settling = setTimeout(() => {
      settling = null
      const now = digestOf(files)
      const what = movedBetween(digested, now)
      digested = now
      if (what.length > 0) moved(what)
    }, settleMs)
  }
  for (const dir of dirsOf(files)) {
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
