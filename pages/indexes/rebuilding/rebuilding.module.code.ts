import { existsSync, mkdirSync, renameSync, rmdirSync, rmSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import type { Entry } from "akasha/pages/indexes/entries/index-entries.module.code.ts"
import type { Filing, Reading } from "akasha/pages/indexes/shape/index-shape.module.code.ts"
import { indexAt } from "akasha/pages/indexes/surface/index-surface.module.code.ts"
import { walkedUnder } from "akasha/pages/indexes/tree-reading/tree-reading.module.code.ts"
import { textThere } from "akasha/utils/fs/text-there/text-there.module.code.ts"

export function wholeOf(lines: readonly string[]): string {
  return `${lines.join("\n")}\n`
}

export function bodiesFrom(
  reading: Reading,
  filings: readonly Filing[]
): ReadonlyMap<string, string | null> {
  const held = new Map<string, string | null>()
  for (const one of filings) {
    const lines = reading.lines(one.at)
    held.set(indexAt(one.at), lines.length === 0 ? null : wholeOf(lines))
  }
  return held
}

export type Laid = {
  readonly added: readonly string[]
  readonly changed: readonly string[]
}

export type Drift = Laid & {
  readonly went: readonly string[]
}

function pruneAbove(at: string, root: string): undefined {
  let here = at
  while (here !== root && here.startsWith(root)) {
    try {
      rmdirSync(here)
    } catch {
      return
    }
    here = dirname(here)
  }
}

export function keepWhole(at: string, lines: readonly string[], root: string): undefined {
  if (lines.length === 0) {
    if (existsSync(at)) rmSync(at)
    pruneAbove(dirname(at), root)
    return
  }
  mkdirSync(dirname(at), { recursive: true })
  const near = `${at}.${process.pid}.part`
  writeFileSync(near, wholeOf(lines))
  renameSync(near, at)
}

export function keepDelta(at: string, one: Filing, root: string): undefined {
  const was = textThere(at)
  const gone = new Set(one.went)
  const coming = new Set(one.came)
  const said: string[] = []
  for (const line of (was ?? "").split("\n")) {
    if (line === "" || gone.has(line) || coming.has(line)) continue
    said.push(line)
  }
  for (const line of coming) said.push(line)
  const lines = said.sort()
  if (was === (lines.length === 0 ? null : wholeOf(lines))) return
  keepWhole(at, lines, root)
}

export function reconcile(entries: readonly Entry[], root: string, put: boolean): Laid {
  const wanted = Map.groupBy(entries, (one) => one.at)
  const added: string[] = []
  const changed: string[] = []
  for (const [at, held] of wanted) {
    const lines = [...new Set(held.map((one) => one.line))].sort()
    const path = join(root, at)
    const was = textThere(path)
    if (was === wholeOf(lines)) continue
    if (was === null) added.push(at)
    else changed.push(at)
    if (put) keepWhole(path, lines, root)
  }
  return { added: added.sort(), changed: changed.sort() }
}

export function takenAway(
  entries: readonly Entry[],
  root: string,
  put: boolean
): readonly string[] {
  const wanted = new Set(entries.map((one) => one.at))
  const went: string[] = []
  for (const one of existsSync(root) ? walkedUnder(root, () => true) : []) {
    const at = one.slice(root.length + 1)
    if (wanted.has(at)) continue
    went.push(at)
    if (put) keepWhole(one, [], root)
  }
  return went.sort()
}
