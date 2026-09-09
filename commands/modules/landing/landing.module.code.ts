import { mkdirSync, rmSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { appendEdits } from "@akasha/changes/edits-keeping"
import type { Judged, Judging } from "@akasha/checks/judging"
import { textIn, textOf } from "@akasha/code/body-text"
import { gitIgnoring } from "@akasha/git/git-pathspec"
import { said as gitIn } from "@akasha/git/git-running"
import type { Change } from "@akasha/pages/change"
import { pathsOf } from "../../../changes/modules/answer/change-answer.module.code.ts"
import type {
  Adding,
  FileChange,
  Removing,
  Replacing,
} from "../../../changes/modules/answer/change-answer.module.types.ts"
import { commitNamed, unfresh } from "../change-freshness/change-freshness.module.code.ts"
import { bodyAt, readingEnded } from "../commit-reading/commit-reading.module.code.ts"
import { committed, whileIndexFrees } from "../committing/committing.module.code.ts"
import { saidBy } from "../fault-saying/fault-saying.module.code.ts"
import {
  clearedOff,
  clearedUnder,
  isFolder,
} from "../folder-clearing/folder-clearing.module.code.ts"
import { indexingLoaded, type Keeping } from "../gate-building/gate-building.module.code.ts"
import { holding } from "../holding/holding.module.code.ts"
import { alsoFailed, alsoSaid } from "../landing-saying/landing-saying.module.code.ts"
import { absentAfter, orphaningIn, orphaningSaid } from "../orphaning/orphaning.module.code.ts"
import type { FileMove } from "../path-moving/path-moving.module.code.ts"
import { movedOnto, movesHeld } from "../path-moving/path-moving.module.code.ts"
import type { Reading as AsRead } from "../reading/reading.module.code.ts"
import { outsideRoot, writesOutside } from "../said-pathing/said-pathing.module.code.ts"

export type FileEdit = {
  readonly path: string
  readonly body: Uint8Array | null
}

export type Landed = {
  readonly base: string
  readonly commit: string | null
  readonly wrote: readonly string[]
  readonly took: readonly string[]
  readonly noted: readonly string[]
  readonly cleared: readonly string[]
}

export type Refused = {
  readonly refusals: readonly string[]
}

export type Drafting = {
  readonly page: string
}

export type Drafted = {
  readonly base: string
  readonly drafted: readonly string[]
}

const AGAIN_WRITTEN = "nothing was written — read them again against what is there now"

const AGAIN_DRAFTED = "nothing was drafted — read them again against what is there now"

const KEPT_AS_IT_WAS = "nothing was drafted — the edits are as the edits were"

const NO_TEXT = "spells no text, so its body is edited by nothing; a move or a removal takes it"

const NOTHING_OUTSIDE = "nothing landed — name every path against the repository root"

const FATAL = new TextDecoder("utf-8", { fatal: true })

function textFrom(bytes: Uint8Array): string | null {
  try {
    return FATAL.decode(bytes)
  } catch {
    return null
  }
}

const BYTES = new TextEncoder()

function bodiedOf(one: Adding | Replacing | Removing): FileEdit {
  if (one.kind === "remove") return { path: one.path, body: null }
  return {
    path: one.path,
    body: BYTES.encode(one.kind === "add" ? one.content : one.contentTo),
  }
}

type Split = {
  readonly edits: readonly FileEdit[]
  readonly moves: readonly FileMove[]
}

function splitIn(changes: readonly FileChange[]): Split {
  const edits: FileEdit[] = []
  const moves: FileMove[] = []
  for (const one of changes) {
    if (one.kind === "move") moves.push({ from: one.pathFrom, to: one.pathTo })
    else edits.push(bodiedOf(one))
  }
  return { edits, moves }
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
    const body = bodiedOf(one)
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

async function judged(judging: Judging, change: Change): Promise<readonly Judged[]> {
  try {
    return await judging.over(change)
  } finally {
    readingEnded()
  }
}

function wroteOnto(
  root: string,
  changed: readonly FileEdit[]
): {
  readonly wrote: readonly string[]
  readonly took: readonly string[]
} {
  for (const one of changed) {
    if (outsideRoot(root, one.path)) throw new Error(writesOutside(one.path))
  }
  const wrote: string[] = []
  const took: string[] = []
  for (const one of changed) {
    const at = join(root, one.path)
    if (one.body === null) {
      if (isFolder(root, one.path)) clearedUnder(root, one.path)
      else rmSync(at, { force: true })
      took.push(one.path)
      continue
    }
    mkdirSync(dirname(at), { recursive: true })
    writeFileSync(at, one.body)
    wrote.push(one.path)
  }
  return { wrote, took }
}

function bodiesOf(
  putting: readonly FileEdit[],
  moving: readonly FileMove[],
  onto: readonly FileEdit[],
  before: ReadonlyMap<string, Uint8Array | null>
): ReadonlyMap<string, Uint8Array> {
  const held = new Map<string, Uint8Array>()
  for (const one of putting) if (one.body !== null) held.set(one.path, one.body)
  for (const one of moving) {
    const body = before.get(one.from) ?? null
    if (body !== null) held.set(one.to, body)
  }
  for (const one of onto) if (one.body !== null) held.set(one.path, one.body)
  return held
}

function heldBack(
  root: string,
  changed: readonly FileEdit[]
): {
  readonly committing: readonly FileEdit[]
  readonly uncommitted: readonly FileEdit[]
} {
  const ignored = gitIgnoring(
    root,
    changed.map((one) => one.path)
  )
  if (ignored === null || ignored.size === 0) return { committing: changed, uncommitted: [] }
  return {
    committing: changed.filter((one) => !ignored.has(one.path)),
    uncommitted: changed.filter((one) => ignored.has(one.path)),
  }
}

function beforeOf(
  root: string,
  base: string,
  paths: readonly string[]
): Map<string, Uint8Array | null> {
  try {
    const held = new Map<string, Uint8Array | null>()
    for (const one of paths) held.set(one, bodyAt(root, base, one))
    return held
  } finally {
    readingEnded()
  }
}

function restored(root: string, before: ReadonlyMap<string, Uint8Array | null>): undefined {
  wroteOnto(
    root,
    [...before].map(([path, body]) => ({ path, body }))
  )
}

function reindexed(
  root: string,
  changed: readonly FileEdit[],
  moves: readonly FileMove[],
  before: ReadonlyMap<string, Uint8Array | null>,
  keeping: Keeping
): undefined {
  const held = keeping(root)
  const named = new Set(changed.map((one) => one.path))
  for (const one of changed) {
    const was = textOf(one.body)
    const back = before.get(one.path) ?? null
    if (back === null) held.took(one.path, was)
    else held.wrote(one.path, textIn(back), was)
  }
  for (const one of moves) {
    const back = before.get(one.from) ?? null
    if (!named.has(one.to)) held.took(one.to, textOf(back))
    if (back !== null) held.wrote(one.from, textIn(back), null)
  }
  held.settle()
}

function unstaged(root: string, changed: readonly FileEdit[]): undefined {
  whileIndexFrees(() =>
    gitIn(root, ["reset", "-q", "HEAD", "--", ...changed.map((one) => one.path)])
  )
}

function indexed(
  root: string,
  changed: readonly FileEdit[],
  moves: readonly FileMove[],
  before: ReadonlyMap<string, Uint8Array | null>,
  keeping: Keeping
): readonly string[] {
  const held = keeping(root)
  const named = new Set(changed.map((one) => one.path))
  for (const one of changed) {
    const was = textOf(before.get(one.path) ?? null)
    if (one.body === null) held.took(one.path, was)
    else held.wrote(one.path, textIn(one.body), was)
  }
  for (const one of moves) {
    const body = before.get(one.from) ?? null
    held.took(one.from, textOf(body))
    if (named.has(one.to) || body === null) continue
    held.wrote(one.to, textIn(body), textOf(before.get(one.to) ?? null))
  }
  return held.settle()
}

export function rowsFrom(
  root: string,
  base: string,
  changes: readonly FileEdit[]
): { readonly rows: readonly FileChange[] } | { readonly why: string } {
  const rows: FileChange[] = []
  for (const one of changes) {
    if (one.body === null) {
      rows.push({ kind: "remove", path: one.path })
      continue
    }
    const body = textFrom(one.body)
    if (body === null) return { why: `${one.path} ${NO_TEXT}` }
    const held = bodyAt(root, base, one.path)
    if (held === null) {
      rows.push({ kind: "add", path: one.path, content: body })
      continue
    }
    const was = textFrom(held)
    if (was === null) return { why: `${one.path} ${NO_TEXT}` }
    if (was === body) continue
    rows.push({ kind: "replace", path: one.path, contentFrom: was, contentTo: body })
  }
  return { rows }
}

function draftedBy(
  root: string,
  page: string,
  changes: readonly FileChange[],
  named: string | null,
  asRead: readonly AsRead[]
): Drafted | Refused {
  const base = baseOf(root)
  const changing = [...new Set(changes.flatMap(pathsOf))]
  const stale = unfresh(root, named, base, changing, asRead, AGAIN_DRAFTED)
  if (stale !== null) return { refusals: stale }
  const kept = appendEdits(root, page, changes)
  if ("why" in kept) return { refusals: [kept.why, KEPT_AS_IT_WAS] }
  return { base, drafted: [...changing].sort() }
}

export function landing(
  root: string,
  changes: readonly FileChange[],
  message: string,
  judging: Judging,
  writer?: string | null,
  read?: string | null,
  asRead?: readonly AsRead[],
  drafting?: null,
  over?: Change | null
): Promise<Landed | Refused>
export function landing(
  root: string,
  changes: readonly FileChange[],
  message: string,
  judging: Judging,
  writer: string | null,
  read: string | null,
  asRead: readonly AsRead[],
  drafting: Drafting
): Promise<Drafted | Refused>
export async function landing(
  root: string,
  changes: readonly FileChange[],
  message: string,
  judging: Judging,
  writer: string | null = null,
  read: string | null = null,
  asRead: readonly AsRead[] = [],
  drafting: Drafting | null = null,
  over: Change | null = null
): Promise<Landed | Refused | Drafted> {
  if (changes.length === 0) {
    const base = baseOf(root)
    if (drafting !== null) return { base, drafted: [] }
    return { base, commit: null, wrote: [], took: [], noted: [], cleared: [] }
  }
  const outside = changes
    .flatMap(pathsOf)
    .filter((one) => outsideRoot(root, one))
    .map(writesOutside)
  if (outside.length > 0) return { refusals: [...outside, NOTHING_OUTSIDE] }
  const named = read === null ? null : commitNamed(root, read)
  if (read !== null && named === null) {
    return {
      refusals: [
        `\`${read}\` names no commit, so it says nothing about what this change read`,
        "nothing was written — name a commit that is there, or name none",
      ],
    }
  }
  if (drafting !== null) {
    return draftedBy(root, drafting.page, changes, named, asRead)
  }
  const judgedAt = baseOf(root)
  const { edits, moves } = splitIn(changes)
  const change = over !== null && moves.length === 0 ? over : changeOf(root, judgedAt, changes)
  const said = await judged(judging, change)
  const orphaned = orphaningIn(change, absentAfter(edits, moves))
  if (orphaned.length > 0) {
    return {
      refusals: [
        ...orphaned.map(orphaningSaid),
        `nothing was written — ${changes.length} change(s) were asked for and they land together or not at all`,
      ],
    }
  }
  if (said.length > 0) {
    return {
      refusals: [
        ...said.map((one) => `${one.path} — ${one.reason}`),
        `nothing was written — ${changes.length} change(s) were asked for and they land together or not at all`,
      ],
    }
  }
  return holding(root, () => {
    const base = baseOf(root)
    const paths = edits.map((one) => one.path)
    const stale = unfresh(root, named, base, paths, asRead, AGAIN_WRITTEN)
    if (stale !== null) return { refusals: stale }
    const split = heldBack(root, edits)
    const moving = movesHeld(
      moves,
      beforeOf(
        root,
        base,
        moves.map((one) => one.from)
      )
    )
    const lands = new Set(moves.map((one) => one.to))
    const before = beforeOf(root, base, [
      ...split.committing.map((one) => one.path),
      ...moving.committing.flatMap((one) => [one.from, one.to]),
    ])
    const keeping = indexingLoaded()
    try {
      const putting = split.committing.filter((one) => !lands.has(one.path))
      const put = wroteOnto(root, putting)
      const noted = indexed(root, edits, moving.committing, before, keeping)
      const back = movedOnto(root, moves)
      try {
        const onto = split.committing.filter((one) => lands.has(one.path))
        const then = wroteOnto(root, onto)
        const bodies = bodiesOf(putting, moving.committing, onto, before)
        const wrote = [...bodies.keys()]
        const took = [
          ...new Set([...put.took, ...moving.committing.map((one) => one.from), ...then.took]),
        ]
        const commit = committed(root, bodies, took, message, writer)
        wroteOnto(root, split.uncommitted)
        const gone = [...put.took, ...then.took, ...moves.map((one) => one.from)]
        const cleared = clearedOff(root, gone)
        return { base, commit, wrote, took, noted, cleared }
      } catch (thrown) {
        back()
        throw thrown
      }
    } catch (thrown) {
      restored(root, before)
      const back = alsoFailed(() => reindexed(root, edits, moving.committing, before, keeping))
      const off = alsoFailed(() => unstaged(root, edits))
      if (back === null && off === null) throw thrown
      throw new Error(alsoSaid(saidBy(thrown), back, off))
    }
  })
}
