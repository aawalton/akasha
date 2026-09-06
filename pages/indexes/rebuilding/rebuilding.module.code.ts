import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  renameSync,
  rmdirSync,
  rmSync,
  writeFileSync,
} from "node:fs"
import { basename, dirname, join } from "node:path"

const INDEX = "index"

import type { Entry } from "../entries/index-entries.module.code.ts"
import { walkedUnder } from "../tree-reading/tree-reading.module.code.ts"

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
  writeFileSync(near, `${lines.join("\n")}\n`)
  renameSync(near, at)
}

function bodyAt(at: string): string | null {
  try {
    return readFileSync(at, "utf8")
  } catch {
    return null
  }
}

// Every file the index holds sits under a folder named for an index, and the index is one folder.
// So a file at the index's own top, and a folder beside it whose name opens `index.`, belong to no
// index. This answers only for a folder actually named `index`, because a scratch index built for a
// test sits beside folders that are nobody's business here.
export function sweptBeside(root: string): readonly string[] {
  if (basename(root) !== INDEX) return []
  const taken: string[] = []
  for (const one of readdirSync(root, { withFileTypes: true })) {
    if (one.isDirectory()) continue
    const at = join(root, one.name)
    rmSync(at)
    taken.push(at)
  }
  for (const one of readdirSync(dirname(root), { withFileTypes: true })) {
    if (!one.isDirectory() || !one.name.startsWith(`${INDEX}.`)) continue
    const at = join(dirname(root), one.name)
    rmSync(at, { recursive: true })
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
    const was = bodyAt(path)
    if (was === `${lines.join("\n")}\n`) continue
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
