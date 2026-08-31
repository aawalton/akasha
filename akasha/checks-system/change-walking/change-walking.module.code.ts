import { readFileSync } from "node:fs"
import { join } from "node:path"
import type { Change } from "../../pages-system/change/change.module.code.ts"
import { everyPathAnswered } from "../../pages-system/indexes/index-reading/index-reading.module.code.ts"
import type { Reading } from "../../pages-system/indexes/index-surface/index-surface.module.code.ts"
import type { Judged, Running } from "../judging/judging.module.code.ts"

export type Body = {
  readonly root: string
  readonly path: string
  readonly bytes: Uint8Array
}

const TS = "ts"

const TS_ENDING = `.${TS}`

export function overEachText(
  found: (path: string, text: string) => readonly string[]
): (given: Body) => readonly string[] {
  return (given) => {
    if (!given.path.endsWith(TS_ENDING)) return []
    const text = bodyOf(given)
    if (text === null) return []
    return found(given.path, text)
  }
}

export function judgingEachFile(judge: (given: Body) => readonly string[]): Running {
  return (change) => overEachFile(change, judge)
}

export function overEachFile(
  change: Change,
  judge: (given: Body) => readonly string[]
): readonly Judged[] {
  const said: Judged[] = []
  for (const path of change.changed) {
    const bytes = change.after(path)
    if (bytes === null) continue
    for (const reason of judge({ root: change.root, path, bytes })) said.push({ path, reason })
  }
  return said
}

export function everyFileIn(root: string, given: string | Reading = root): readonly string[] {
  return [...new Set(everyPathAnswered(root, given))].sort()
}

export function everythingIn(root: string): Change {
  const both = onDisk(root)
  return { root, changed: everyFileIn(root), before: both, after: both }
}

export function onDisk(root: string): (path: string) => Uint8Array | null {
  return (path) => {
    const full = join(root, path)
    try {
      return readFileSync(full)
    } catch {
      return null
    }
  }
}

export function bodyOf(given: Body): string | null {
  try {
    return new TextDecoder("utf-8", { fatal: true }).decode(given.bytes)
  } catch {
    return null
  }
}

export function textIn(change: Change, path: string): string | null {
  const bytes = change.after(path)
  if (bytes === null) return null
  return bodyOf({ root: change.root, path, bytes })
}
