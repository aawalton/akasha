import { mkdirSync, rmSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import type { FileChange } from "@akasha/changes/change-answer/types"
import { appendEdits } from "@akasha/changes/edits-keeping"
import type { Judged, Judging } from "@akasha/checks/judging"
import { textIn, textOf } from "@akasha/code/body-text"
import { gitIgnoring } from "@akasha/git/git-pathspec"
import { said as gitIn } from "@akasha/git/git-running"
import type { Change } from "@akasha/pages/change"
import {
  commitNamed,
  unfresh,
} from "../../commands/modules/change-freshness/change-freshness.module.code.ts"
import {
  bodyAt,
  readingEnded,
} from "../../commands/modules/commit-reading/commit-reading.module.code.ts"
import {
  committed,
  whileIndexFrees,
} from "../../commands/modules/committing/committing.module.code.ts"
import type { Bodies } from "../../commands/modules/drafting/drafting.module.code.ts"
import {
  clearedOff,
  clearedUnder,
  isFolder,
} from "../../commands/modules/folder-clearing/folder-clearing.module.code.ts"
import {
  indexingLoaded,
  type Keeping,
} from "../../commands/modules/gate-building/gate-building.module.code.ts"
import { holding } from "../../commands/modules/holding/holding.module.code.ts"
import {
  absentAfter,
  orphaningIn,
  orphaningSaid,
} from "../../commands/modules/orphaning/orphaning.module.code.ts"
import {
  outsideRoot,
  writesOutside,
} from "../../commands/modules/said-pathing/said-pathing.module.code.ts"
import { saidBy } from "../fault-saying/fault-saying.module.code.ts"
import type { FileMove } from "../path-moving/path-moving.module.code.ts"
import { movedOnto, movesHeld } from "../path-moving/path-moving.module.code.ts"
import type { Reading as AsRead } from "../reading/reading.module.code.ts"

export type FileEdit = {
  readonly path: string
  readonly body: Uint8Array | null
}

export type Proposed = {
  readonly base: string
  readonly edits: readonly FileEdit[]
  readonly moves?: readonly FileMove[]
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

export function editsOf(held: Bodies): readonly FileEdit[] {
  return [...held].map(([path, one]) => ({ path, body: one.body }))
}

export function baseOf(root: string): string {
  return gitIn(root, ["rev-parse", "HEAD"]).trim()
}

export function changeOf(root: string, proposed: Proposed): Change {
  const moves = proposed.moves ?? []
  const held = new Map<string, Uint8Array | null>()
  for (const one of moves) held.set(one.from, null)
  for (const one of proposed.edits) held.set(one.path, one.body)
  const came = new Map(moves.map((one) => [one.to, one.from]))
  const read = new Map<string, Uint8Array | null>()
  const based = (path: string): Uint8Array | null => {
    const found = read.get(path)
    if (found !== undefined) return found
    if (read.has(path)) return null
    const body = bodyAt(root, proposed.base, path)
    read.set(path, body)
    return body
  }
  return {
    root,
    changed: [...new Set([...held.keys(), ...came.keys()])].sort(),
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

function alsoFailed(act: () => undefined): string | null {
  try {
    act()
    return null
  } catch (thrown) {
    return saidBy(thrown)
  }
}

function alsoSaid(why: string, back: string | null, off: string | null): string {
  const held = [why]
  if (back !== null) {
    held.push(`the index still names what did not land, and putting it back failed too: ${back}`)
    held.push("`akasha index refresh` builds the index again")
  }
  if (off !== null) held.push(`what was staged is staged still: ${off}`)
  return held.join("; ")
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

function statedFrom(
  root: string,
  base: string,
  changes: readonly FileEdit[]
): { readonly rows: readonly FileChange[] } | { readonly why: string } {
  const before = beforeOf(
    root,
    base,
    changes.map((one) => one.path)
  )
  const rows: FileChange[] = []
  for (const one of changes) {
    if (one.body === null) {
      rows.push({ kind: "remove", path: one.path })
      continue
    }
    const body = textFrom(one.body)
    if (body === null) return { why: `${one.path} ${NO_TEXT}` }
    const held = before.get(one.path) ?? null
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
  changes: readonly FileEdit[],
  named: string | null,
  asRead: readonly AsRead[]
): Drafted | Refused {
  const base = baseOf(root)
  const changing = changes.map((one) => one.path)
  const stale = unfresh(root, named, base, changing, asRead, AGAIN_DRAFTED)
  if (stale !== null) return { refusals: stale }
  const said = statedFrom(root, base, changes)
  if ("why" in said) return { refusals: [said.why, KEPT_AS_IT_WAS] }
  const kept = appendEdits(root, page, said.rows)
  if ("why" in kept) return { refusals: [kept.why, KEPT_AS_IT_WAS] }
  return { base, drafted: [...changing].sort() }
}

export function landing(
  root: string,
  changes: readonly FileEdit[],
  message: string,
  judging: Judging,
  writer?: string | null,
  read?: string | null,
  asRead?: readonly AsRead[],
  moves?: readonly FileMove[],
  drafting?: null,
  over?: Change | null
): Promise<Landed | Refused>
export function landing(
  root: string,
  changes: readonly FileEdit[],
  message: string,
  judging: Judging,
  writer: string | null,
  read: string | null,
  asRead: readonly AsRead[],
  moves: readonly FileMove[],
  drafting: Drafting
): Promise<Drafted | Refused>
export async function landing(
  root: string,
  changes: readonly FileEdit[],
  message: string,
  judging: Judging,
  writer: string | null = null,
  read: string | null = null,
  asRead: readonly AsRead[] = [],
  moves: readonly FileMove[] = [],
  drafting: Drafting | null = null,
  over: Change | null = null
): Promise<Landed | Refused | Drafted> {
  if (changes.length === 0 && moves.length === 0) {
    return { refusals: ["nothing was asked for, so nothing was judged and nothing was written"] }
  }
  const outside = [...changes.map((one) => one.path), ...moves.flatMap((one) => [one.from, one.to])]
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
  const edits: readonly FileEdit[] = changes
  const change =
    over !== null && moves.length === 0 ? over : changeOf(root, { base: judgedAt, edits, moves })
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
    const paths = changes.map((one) => one.path)
    const stale = unfresh(root, named, base, paths, asRead, AGAIN_WRITTEN)
    if (stale !== null) return { refusals: stale }
    const split = heldBack(root, changes)
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
      const noted = indexed(root, changes, moving.committing, before, keeping)
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
      const back = alsoFailed(() => reindexed(root, changes, moving.committing, before, keeping))
      const off = alsoFailed(() => unstaged(root, changes))
      if (back === null && off === null) throw thrown
      throw new Error(alsoSaid(saidBy(thrown), back, off))
    }
  })
}
