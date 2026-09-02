import { existsSync, mkdirSync, renameSync, rmSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import type { Judged, Judging } from "@akasha/checks/judging"
import { textIn, textOf } from "@akasha/code-system/body-text"
import { said as gitIn } from "@akasha/git/git-running"
import type { Change } from "@akasha/pages-system/change"
import { movedOnDisk } from "../change-freshness/change-freshness.module.code.ts"
import { bodyAt, readingEnded } from "../commit-reading/commit-reading.module.code.ts"
import { committed, whileIndexFrees } from "../committing/committing.module.code.ts"
import { saidBy } from "../fault-saying/fault-saying.module.code.ts"
import { clearedOff } from "../folder-clearing/folder-clearing.module.code.ts"
import type { Keeping } from "../gate-building/gate-building.module.code.ts"
import { indexingLoaded } from "../gate-building/gate-building.module.code.ts"
import { holding } from "../holding/holding.module.code.ts"
import type { Reading as AsRead } from "../reading/reading.module.code.ts"

export type FileEdit = {
  readonly path: string
  readonly body: Uint8Array | null
  readonly carried?: boolean
}

export type FileCarry = {
  readonly from: string
  readonly to: string
}

export type Proposed = {
  readonly base: string
  readonly edits: readonly FileEdit[]
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

export function baseOf(root: string): string {
  return gitIn(root, ["rev-parse", "HEAD"]).trim()
}

export function changeOf(root: string, proposed: Proposed): Change {
  const held = new Map<string, Uint8Array | null>()
  for (const one of proposed.edits) held.set(one.path, one.body)
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
    changed: proposed.edits.map((one) => one.path).sort(),
    before: based,
    after: (path) => {
      const said = held.get(path)
      if (said !== undefined) return said
      if (held.has(path)) return null
      return based(path)
    },
  }
}

function judged(judging: Judging, change: Change): readonly Judged[] {
  try {
    return judging.over(change)
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
  const wrote: string[] = []
  const took: string[] = []
  for (const one of changed) {
    const at = join(root, one.path)
    if (one.body === null) {
      rmSync(at, { force: true })
      took.push(one.path)
      continue
    }
    mkdirSync(dirname(at), { recursive: true })
    writeFileSync(at, one.body)
    wrote.push(one.path)
  }
  return { wrote, took }
}

function beforeOf(
  root: string,
  base: string,
  changed: readonly FileEdit[]
): Map<string, Uint8Array | null> {
  try {
    const held = new Map<string, Uint8Array | null>()
    for (const one of changed) held.set(one.path, bodyAt(root, base, one.path))
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
  before: ReadonlyMap<string, Uint8Array | null>,
  keeping: Keeping
): undefined {
  const held = keeping(root)
  for (const one of changed) {
    const was = textOf(one.body)
    const back = before.get(one.path) ?? null
    if (back === null) held.took(one.path, was)
    else held.wrote(one.path, textIn(back), was)
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

function carriedOnto(root: string, carries: readonly FileCarry[]): () => undefined {
  const gone: FileCarry[] = []
  const back = (): undefined => {
    for (const one of [...gone].reverse()) renameSync(join(root, one.to), join(root, one.from))
  }
  try {
    for (const one of carries) {
      const at = join(root, one.from)
      if (!existsSync(at)) continue
      const to = join(root, one.to)
      mkdirSync(dirname(to), { recursive: true })
      renameSync(at, to)
      gone.push(one)
    }
  } catch (thrown) {
    back()
    throw thrown
  }
  return back
}

function indexed(
  root: string,
  changed: readonly FileEdit[],
  before: ReadonlyMap<string, Uint8Array | null>,
  keeping: Keeping
): readonly string[] {
  const held = keeping(root)
  for (const one of changed) {
    const was = textOf(before.get(one.path) ?? null)
    if (one.body === null) held.took(one.path, was)
    else held.wrote(one.path, textIn(one.body), was)
  }
  return held.settle()
}

function sameBody(one: Uint8Array | null, two: Uint8Array | null): boolean {
  if (one === null || two === null) return one === two
  return Buffer.from(one).equals(Buffer.from(two))
}

function movedBetween(
  root: string,
  read: string,
  base: string,
  changed: readonly FileEdit[]
): readonly string[] {
  const moved: string[] = []
  for (const one of changed) {
    if (!sameBody(bodyAt(root, read, one.path), bodyAt(root, base, one.path))) moved.push(one.path)
  }
  return moved.sort()
}

function commitNamed(root: string, named: string): string | null {
  try {
    const said = gitIn(root, [
      "rev-parse",
      "--verify",
      "--quiet",
      "--end-of-options",
      `${named}^{commit}`,
    ]).trim()
    return said === "" ? null : said
  } catch {
    return null
  }
}

export function landing(
  root: string,
  changes: readonly FileEdit[],
  message: string,
  judging: Judging,
  writer: string | null = null,
  read: string | null = null,
  asRead: readonly AsRead[] = [],
  carries: readonly FileCarry[] = []
): Landed | Refused {
  if (changes.length === 0) {
    return { refusals: ["nothing was asked for, so nothing was judged and nothing was written"] }
  }
  const named = read === null ? null : commitNamed(root, read)
  if (read !== null && named === null) {
    return {
      refusals: [
        `\`${read}\` names no commit, so it says nothing about what this change read`,
        "nothing was written — name a commit that stands, or name none",
      ],
    }
  }
  const judgedAt = baseOf(root)
  const said = judged(judging, changeOf(root, { base: judgedAt, edits: changes }))
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
    const moved = named === null || named === base ? [] : movedBetween(root, named, base, changes)
    if (named !== null && moved.length > 0) {
      return {
        refusals: [
          ...moved.map(
            (one) =>
              `${one} — read against \`${named}\`, and what stands at \`${base}\` is not what was read, so writing it would put back what moved in between`
          ),
          "nothing was written — read them again against what stands now",
        ],
      }
    }
    const stirred = movedOnDisk(root, asRead)
    if (stirred.length > 0) {
      return {
        refusals: [
          ...stirred.map(
            (one) =>
              `${one} — what stands on disk is not the body you read, so writing it would put back what moved in between`
          ),
          "nothing was written — read them again against what stands now",
        ],
      }
    }
    const before = beforeOf(root, base, changes)
    const keeping = indexingLoaded()
    try {
      const put = wroteOnto(root, changes)
      const noted = indexed(root, changes, before, keeping)
      const back = carriedOnto(root, carries)
      try {
        const commit = committed(root, put.wrote, put.took, message, writer)
        const gone = [...put.took, ...carries.map((one) => one.from)]
        const cleared = clearedOff(root, gone)
        return { base, commit, wrote: put.wrote, took: put.took, noted, cleared }
      } catch (thrown) {
        back()
        throw thrown
      }
    } catch (thrown) {
      restored(root, before)
      const back = alsoFailed(() => reindexed(root, changes, before, keeping))
      const off = alsoFailed(() => unstaged(root, changes))
      if (back === null && off === null) throw thrown
      throw new Error(alsoSaid(saidBy(thrown), back, off))
    }
  })
}
