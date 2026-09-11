import {
  existsSync,
  mkdirSync,
  readdirSync,
  renameSync,
  rmdirSync,
  rmSync,
  writeFileSync,
} from "node:fs"
import { basename, dirname, join } from "node:path"
import type { Entry } from "akasha/pages/indexes/entries/index-entries.module.code.ts"
import type { Filing, Reading } from "akasha/pages/indexes/shape/index-shape.module.code.ts"
import { INDEX_AT, indexAt } from "akasha/pages/indexes/surface/index-surface.module.code.ts"
import { walkedUnder } from "akasha/pages/indexes/tree-reading/tree-reading.module.code.ts"
import { textThere } from "akasha/utils/fs/text-there/text-there.module.code.ts"

const INDEX = basename(INDEX_AT)

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

export type Drift = {
  readonly added: readonly string[]
  readonly changed: readonly string[]
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

export function sweptBeside(root: string, put: boolean): readonly string[] {
  if (basename(root) !== INDEX || !existsSync(root)) return []
  const taken: string[] = []
  for (const one of readdirSync(root, { withFileTypes: true })) {
    if (one.isDirectory()) continue
    const at = join(root, one.name)
    if (put) rmSync(at)
    taken.push(at)
  }
  for (const one of readdirSync(dirname(root), { withFileTypes: true })) {
    if (!one.isDirectory() || !one.name.startsWith(`${INDEX}.`)) continue
    const at = join(dirname(root), one.name)
    if (put) rmSync(at, { recursive: true })
    taken.push(at)
  }
  return taken.sort()
}

export function reconcile(
  under: string,
  entries: readonly Entry[],
  root: string,
  put: boolean
): Drift {
  const wanted = Map.groupBy(entries, (one) => one.at)
  const added: string[] = []
  const changed: string[] = []
  const went: string[] = []
  for (const [at, held] of wanted) {
    const lines = [...new Set(held.map((one) => one.line))].sort()
    const path = join(root, at)
    const was = textThere(path)
    if (was === wholeOf(lines)) continue
    if (was === null) added.push(at)
    else changed.push(at)
    if (put) keepWhole(path, lines, root)
  }
  for (const one of existsSync(under) ? walkedUnder(under, () => true) : []) {
    const at = one.slice(root.length + 1)
    if (wanted.has(at)) continue
    went.push(at)
    if (put) keepWhole(one, [], root)
  }
  return { added: added.sort(), changed: changed.sort(), went: went.sort() }
}
