import { existsSync, mkdirSync, renameSync, rmdirSync, rmSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import type { Entry } from "akasha/pages/indexes/entries/index-entries.module.code.ts"
import type { Filing, Reading } from "akasha/pages/indexes/shape/index-shape.module.code.ts"
import { indexAt } from "akasha/pages/indexes/surface/index-surface.module.code.ts"
import { walkedUnder } from "akasha/pages/indexes/tree-reading/tree-reading.module.code.ts"
import { textThere } from "akasha/utils/fs/text-there/text-there.module.code.ts"
import { counted } from "akasha/utils/text/counted/counted.module.code.ts"

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

const PARTED_BY = "/"

const WRITTEN = "written"

const TAKING_AWAY = "taking away"

const TAKEN_AWAY = "taken away"

export function filedUnder(at: string): string {
  const cut = at.indexOf(PARTED_BY)
  return cut < 0 ? at : at.slice(0, cut)
}

function stageSaid(stage: string, what: string, many: number, at: string | null): string {
  const said = `${stage} — ${counted(many, "file")} ${what}`
  return at === null ? said : `${said}, \`${at}\` in hand`
}

export function reconcile(
  entries: readonly Entry[],
  root: string,
  put: boolean,
  done: string[] = []
): Laid {
  const wanted = Map.groupBy(entries, (one) => one.at)
  const added: string[] = []
  const changed: string[] = []
  const where = done.length
  let stage: string | null = null
  let wrote = 0
  for (const [at, held] of wanted) {
    const lines = [...new Set(held.map((one) => one.line))].sort()
    const path = join(root, at)
    const was = textThere(path)
    if (was === wholeOf(lines)) continue
    if (was === null) added.push(at)
    else changed.push(at)
    if (!put) continue
    stage = filedUnder(at)
    done[where] = stageSaid(stage, WRITTEN, wrote, at)
    keepWhole(path, lines, root)
    wrote += 1
  }
  if (stage !== null) done[where] = stageSaid(stage, WRITTEN, wrote, null)
  return { added: added.sort(), changed: changed.sort() }
}

export function takenAway(
  entries: readonly Entry[],
  root: string,
  put: boolean,
  done: string[] = []
): readonly string[] {
  const wanted = new Set(entries.map((one) => one.at))
  const went: string[] = []
  const where = done.length
  let took = 0
  for (const one of existsSync(root) ? walkedUnder(root, () => true) : []) {
    const at = one.slice(root.length + 1)
    if (wanted.has(at)) continue
    went.push(at)
    if (!put) continue
    done[where] = stageSaid(TAKING_AWAY, TAKEN_AWAY, took, at)
    keepWhole(one, [], root)
    took += 1
  }
  if (took > 0) done[where] = stageSaid(TAKING_AWAY, TAKEN_AWAY, took, null)
  return went.sort()
}
