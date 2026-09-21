import { existsSync, readFileSync } from "node:fs"
import { join } from "node:path"
import {
  type Adding,
  type Appending,
  type Bringing,
  type FileChange,
  pathsOf,
  type Removing,
  type Replacing,
} from "akasha/change/modules/answer/change-answer.module.code.ts"
import type { FileMove } from "akasha/command/modules/path-moving/path-moving.module.code.ts"
import { bodyAt } from "akasha/git/modules/commit-reading/commit-reading.module.code.ts"
import { said as gitIn } from "akasha/git/modules/running/git-running.module.code.ts"
import type { Settling } from "akasha/page/index/modules/settling/index-settling.module.code.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"
import { referencesFiled } from "akasha/page/modules/referencing/page-referencing.module.code.ts"
import {
  bodyOf,
  shapeIn,
  shapesFiled,
} from "akasha/page/type/page-property/modules/property-shape/property-shape.module.code.ts"

export type Bodied = {
  readonly path: string
  readonly body: Uint8Array | null
}

type Held = ReadonlyMap<string, Uint8Array | null>

type Split = {
  readonly edits: readonly Bodied[]
  readonly moves: readonly FileMove[]
}

export type Settled = {
  readonly base: string
  readonly settling: Settling
}

const BYTES = new TextEncoder()

export function diskAt(root: string, path: string): Uint8Array | null {
  const at = join(root, path)
  return existsSync(at) ? readFileSync(at) : null
}

function endedWith(root: string, one: Appending, held: Held): Uint8Array {
  const was = held.has(one.path) ? (held.get(one.path) ?? null) : diskAt(root, one.path)
  const put = BYTES.encode(one.content)
  if (was === null) return put
  const body = new Uint8Array(was.length + put.length)
  body.set(was)
  body.set(put, was.length)
  return body
}

function bodiedOf(
  root: string,
  one: Adding | Appending | Replacing | Removing | Bringing,
  held: Held
): Bodied {
  if (one.kind === "remove") return { path: one.path, body: null }
  if (one.kind === "bring") return { path: one.path, body: diskAt(root, one.path) }
  if (one.kind === "append") return { path: one.path, body: endedWith(root, one, held) }
  return {
    path: one.path,
    body: BYTES.encode(one.kind === "add" ? one.content : one.contentTo),
  }
}

export function splitIn(root: string, changes: readonly FileChange[]): Split {
  const edits = new Map<string, Bodied>()
  const bodies = new Map<string, Uint8Array | null>()
  const moves: FileMove[] = []
  for (const one of changes) {
    if (one.kind === "move") {
      moves.push({ from: one.pathFrom, to: one.pathTo })
      continue
    }
    const body = bodiedOf(root, one, bodies)
    bodies.set(body.path, body.body)
    edits.set(body.path, body)
  }
  return { edits: [...edits.values()], moves }
}

export function beforeOf(
  root: string,
  base: string,
  paths: readonly string[]
): Map<string, Uint8Array | null> {
  const held = new Map<string, Uint8Array | null>()
  for (const one of paths) held.set(one, bodyAt(root, base, one))
  return held
}

const TEXT = new TextDecoder()

function rowsIn(body: string | null): readonly string[] {
  return (body ?? "").split("\n").filter((one) => one !== "")
}

type Rowing = {
  readonly keyOf: (line: string) => string | null
  readonly bodied: (lines: readonly string[]) => string
}

const REFERENCES: Rowing = {
  keyOf: (line) => line,
  bodied: (lines) =>
    [...lines]
      .sort()
      .map((one) => `${one}\n`)
      .join(""),
}

const SHAPES: Rowing = {
  keyOf: (line) => {
    const one = shapeIn(line)
    return one === null ? null : `${one.pageTypeSlug}/${one.slug}`
  },
  bodied: (lines) =>
    bodyOf(
      lines.flatMap((line) => {
        const one = shapeIn(line)
        return one === null ? [] : [one]
      })
    ),
}

function rowingFor(path: string): Rowing | null {
  if (referencesFiled(path)) return REFERENCES
  return shapesFiled(path) ? SHAPES : null
}

export function besideBefore(changes: readonly FileChange[]): ReadonlyMap<string, string | null> {
  const held = new Map<string, string | null>()
  for (const one of changes) {
    if (one.kind === "move" || held.has(one.path)) continue
    if (rowingFor(one.path) === null) continue
    if (one.kind === "add") held.set(one.path, null)
    if (one.kind === "replace") held.set(one.path, one.contentFrom)
  }
  return held
}

function keyedIn(lines: readonly string[], rowing: Rowing): Map<string, string> | null {
  const held = new Map<string, string>()
  for (const one of lines) {
    const key = rowing.keyOf(one)
    if (key === null) return null
    held.set(key, one)
  }
  return held
}

function rowsMerged(
  was: string | null,
  mine: string,
  now: string | null,
  rowing: Rowing
): string | null {
  const had = keyedIn(rowsIn(was), rowing)
  const kept = keyedIn(rowsIn(mine), rowing)
  const tree = keyedIn(rowsIn(now), rowing)
  if (had === null || kept === null || tree === null) return null
  const rows = new Map<string, string>()
  for (const [key, line] of tree) {
    const held = kept.get(key)
    if (held !== undefined) rows.set(key, held)
    else if (!had.has(key)) rows.set(key, line)
  }
  for (const [key, line] of kept) {
    if (!had.has(key)) rows.set(key, line)
  }
  return rowing.bodied([...rows.values()])
}

export function besideRebased(
  root: string,
  edits: readonly Bodied[],
  before: ReadonlyMap<string, string | null>
): readonly Bodied[] {
  if (before.size === 0) return edits
  return edits.map((one) => {
    const rowing = rowingFor(one.path)
    if (one.body === null || rowing === null || !before.has(one.path)) return one
    const mine = TEXT.decode(one.body)
    const now = diskAt(root, one.path)
    const said = rowsMerged(
      before.get(one.path) ?? null,
      mine,
      now === null ? null : TEXT.decode(now),
      rowing
    )
    if (said === null || said === "" || said === mine) return one
    return { path: one.path, body: BYTES.encode(said) }
  })
}

export function baseOf(root: string): string {
  return gitIn(root, ["rev-parse", "HEAD"]).trim()
}

export function changeOf(
  root: string,
  base: string,
  changes: readonly FileChange[],
  filed: readonly FileChange[] = []
): Change {
  const held = new Map<string, Uint8Array | null>()
  const came = new Map<string, string>()
  const every = [...changes, ...filed]
  for (const one of every) {
    if (one.kind !== "move") continue
    held.set(one.pathFrom, null)
    came.set(one.pathTo, one.pathFrom)
  }
  for (const one of every) {
    if (one.kind === "move") continue
    const body = bodiedOf(root, one, held)
    held.set(body.path, body.body)
  }
  const read = new Map<string, Uint8Array | null>()
  const based = (path: string): Uint8Array | null => {
    const found = read.get(path)
    if (found !== undefined) return found
    if (read.has(path)) return null
    const body = bodyAt(root, base, path)
    read.set(path, body)
    return body
  }
  return {
    root,
    base,
    changed: [...new Set(changes.flatMap(pathsOf))].sort(),
    carried: [...new Set(every.flatMap(pathsOf))].sort(),
    before: based,
    after: (path) => {
      const said = held.get(path)
      if (said !== undefined) return said
      if (held.has(path)) return null
      const from = came.get(path)
      if (from !== undefined) return based(from)
      return based(path)
    },
  }
}
