import {
  type BodyOf,
  NOT_TEXT,
  notText,
  pathsOf,
  replayed,
} from "akasha/changes/modules/answer/change-answer.module.code.ts"
import type {
  Bringing,
  FileChange,
  Answer as Said,
} from "akasha/changes/modules/answer/change-answer.module.types.ts"
import { bodyIn } from "akasha/changes/modules/edits-keeping/edits-keeping.module.code.ts"
import { textIn } from "akasha/code/body-text/body-text.module.code.ts"
import { formattedBodies } from "akasha/code/format/code-format.module.code.ts"
import type { FileMove } from "akasha/commands/modules/path-moving/path-moving.module.code.ts"
import { bodyAt } from "akasha/git/commit-reading/commit-reading.module.code.ts"
import { said as gitSaid } from "akasha/git/running/git-running.module.code.ts"

const BYTES = new TextEncoder()

const FATAL = new TextDecoder("utf-8", { fatal: true })

const NOT_TEXT_SAID = "is not text, so no body is worked out for it"

const RENAMED = /^R\d+\t(.+)\t(.+)$/

const FOLLOWED_AT_MOST = 32

export function owingIn(said: Said): ReadonlyMap<string, boolean> {
  const owed = new Map<string, boolean>()
  for (const one of said.edits) {
    if (one.readersOweReading === undefined) continue
    const at = one.kind === "move" ? [one.pathFrom, one.pathTo] : [one.path]
    for (const path of at) owed.set(path, (owed.get(path) ?? false) || one.readersOweReading)
  }
  return owed
}

export type Landing = {
  readonly rows: readonly FileChange[]
  readonly moves: readonly FileMove[]
  readonly formatted: ReadonlySet<string>
  readonly owed: ReadonlyMap<string, boolean>
}

function namedIn(said: Said): ReadonlyMap<string, number> {
  const named = new Map<string, number>()
  for (const one of said.edits) {
    for (const path of pathsOf(one)) named.set(path, (named.get(path) ?? 0) + 1)
  }
  return named
}

export function movesIn(said: Said): readonly FileMove[] {
  const named = namedIn(said)
  const moves: FileMove[] = []
  for (const one of said.edits) {
    if (one.kind !== "move") continue
    if (named.get(one.pathFrom) !== 1 || named.get(one.pathTo) !== 1) continue
    moves.push({ from: one.pathFrom, to: one.pathTo })
  }
  return moves
}

export function bringsIn(said: Said): readonly Bringing[] {
  const named = namedIn(said)
  const brings: Bringing[] = []
  for (const one of said.edits) {
    if (one.kind !== "bring") continue
    if (named.get(one.path) !== 1) continue
    brings.push(one)
  }
  return brings
}

function overCommit(root: string, head: string): BodyOf {
  const onDisk = bodyIn(root)
  return (path) => {
    const bytes = bodyAt(root, head, path)
    if (bytes === null) return onDisk(path)
    try {
      return FATAL.decode(bytes)
    } catch {
      return NOT_TEXT
    }
  }
}

function wentTo(root: string, head: string, path: string): string | null {
  const at = gitSaid(root, ["log", "--format=%H", "--diff-filter=D", "-1", head, "--", path]).trim()
  if (at === "") return null
  const said = gitSaid(root, ["diff-tree", "-r", "-M", "--no-commit-id", "--name-status", at])
  for (const line of said.split("\n")) {
    const found = RENAMED.exec(line)
    if (found?.[1] === path) return found[2] ?? null
  }
  return null
}

export function renamedTo(root: string, head: string, path: string): string | null {
  let at = path
  for (let spun = 0; spun < FOLLOWED_AT_MOST; spun++) {
    const next = wentTo(root, head, at)
    if (next === null) break
    at = next
    if (bodyAt(root, head, at) !== null) break
  }
  return at === path ? null : at
}

function goneSaid(root: string, head: string, said: Said, over: BodyOf): readonly string[] {
  const notes: string[] = []
  const seen = new Set<string>()
  for (const one of said.edits) {
    for (const path of pathsOf(one)) {
      if (seen.has(path)) continue
      seen.add(path)
      if (over(path) !== null) continue
      const to = renamedTo(root, head, path)
      if (to !== null) notes.push(`\`${path}\` was renamed to \`${to}\` since it was read`)
    }
  }
  return notes
}

export function landingFrom(
  root: string,
  head: string,
  said: Said
): Landing | { readonly why: string } {
  const moves = movesIn(said)
  const moved = new Set(moves.flatMap((one) => [one.from, one.to]))
  const brings = bringsIn(said)
  const brought = new Set(brings.map((one) => one.path))
  const over = overCommit(root, head)
  const after = replayed(said, (path) =>
    moved.has(path) ? (over(path) === null ? null : NOT_TEXT) : over(path)
  )
  if ("refused" in after) {
    return { why: [after.refused, ...goneSaid(root, head, said, over)].join("\n") }
  }
  const rows: FileChange[] = []
  const taking = new Map<string, Uint8Array>()
  for (const [path, body] of after) {
    if (moved.has(path) || brought.has(path)) continue
    if (notText(body)) return { why: `\`${path}\` ${NOT_TEXT_SAID}` }
    if (body === null) {
      rows.push({ kind: "remove", path })
      continue
    }
    taking.set(path, BYTES.encode(body))
    rows.push({ kind: "add", path, content: body })
  }
  const done = formattedBodies(root, taking)
  const filled = rows.map((one) => {
    if (one.kind !== "add") return one
    const made = done.get(one.path)
    return made === undefined
      ? one
      : { kind: "add" as const, path: one.path, content: textIn(made.body) }
  })
  return {
    rows: [...brings, ...filled],
    moves,
    formatted: new Set(taking.keys()),
    owed: owingIn(said),
  }
}
