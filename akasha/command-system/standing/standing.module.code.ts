import { readFileSync } from "node:fs"
import { join } from "node:path"
import { changedSince } from "../../pages-system/indexes/index-stamp/index-stamp.module.code.ts"
import { blobIdOf, type Reading, sameBody } from "../reading/reading.module.code.ts"

export const INSIDE = "akasha"

export function movedOnDisk(root: string, asRead: readonly Reading[]): readonly string[] {
  const moved: string[] = []
  for (const one of asRead) {
    let stood = ""
    try {
      stood = blobIdOf(readFileSync(join(root, one.path)))
    } catch {}
    if (!sameBody(one, stood)) moved.push(one.path)
  }
  return moved.sort()
}

export function reachedSince(root: string, base: string, now: string): readonly string[] | null {
  if (now === base) return []
  const found = changedSince(root, base, now, INSIDE)
  return found === null ? null : [...found].sort()
}
