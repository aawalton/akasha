import {
  existsSync,
  mkdirSync,
  readFileSync,
  renameSync,
  rmdirSync,
  rmSync,
  writeFileSync,
} from "node:fs"
import { dirname, join } from "node:path"
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
