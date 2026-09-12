import { existsSync, readFileSync } from "node:fs"
import { join } from "node:path"
import { pathsOf } from "akasha/changes/modules/answer/change-answer.module.code.ts"
import type {
  Adding,
  Appending,
  Bringing,
  FileChange,
  Removing,
  Replacing,
} from "akasha/changes/modules/answer/change-answer.module.types.ts"
import type { FileMove } from "akasha/commands/modules/path-moving/path-moving.module.code.ts"
import { bodyAt } from "akasha/git/commit-reading/commit-reading.module.code.ts"
import { said as gitIn } from "akasha/git/running/git-running.module.code.ts"
import type { Change } from "akasha/pages/modules/change/change.module.code.ts"

export type Bodied = {
  readonly path: string
  readonly body: Uint8Array | null
}

type Held = ReadonlyMap<string, Uint8Array | null>

type Split = {
  readonly edits: readonly Bodied[]
  readonly moves: readonly FileMove[]
}

const BYTES = new TextEncoder()

function diskAt(root: string, path: string): Uint8Array | null {
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

export function baseOf(root: string): string {
  return gitIn(root, ["rev-parse", "HEAD"]).trim()
}

export function changeOf(root: string, base: string, changes: readonly FileChange[]): Change {
  const held = new Map<string, Uint8Array | null>()
  const came = new Map<string, string>()
  for (const one of changes) {
    if (one.kind !== "move") continue
    held.set(one.pathFrom, null)
    came.set(one.pathTo, one.pathFrom)
  }
  for (const one of changes) {
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
    changed: [...new Set(changes.flatMap(pathsOf))].sort(),
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
