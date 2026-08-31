import { existsSync, mkdirSync, renameSync, rmSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import type { Judged, Judging } from "../../checks-system/judging/judging.module.code.ts"
import { textIn, textOf } from "../../code-system/body-text/body-text.module.code.ts"
import type { Change } from "../../pages-system/change/change.module.code.ts"
import { bodyAt, readingEnded } from "../commit-reading/commit-reading.module.code.ts"
import { committed, gitIn } from "../committing/committing.module.code.ts"
import { oneLine } from "../fault-saying/fault-saying.module.code.ts"
import type { Keeping } from "../gate-building/gate-building.module.code.ts"
import { indexingLoaded } from "../gate-building/gate-building.module.code.ts"
import { holding } from "../holding/holding.module.code.ts"
import type { Reading as AsRead } from "../reading/reading.module.code.ts"
import { INSIDE, movedOnDisk, reachedSince } from "../standing/standing.module.code.ts"

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
  return holding(root, () => {
    const base = baseOf(root)
    const moved = read === null || read === base ? [] : movedBetween(root, read, base, changes)
    if (moved.length > 0) {
      return {
        refusals: [
          ...moved.map(
            (one) =>
              `${one} — read against \`${read}\`, and what stands at \`${base}\` is not what was read, so writing it would put back what moved in between`
          ),
          "nothing was written — read them again against what stands now",
        ],
      }
    }
    const proposed = { base, edits: changes }
    const change = changeOf(root, proposed)
    const said = judged(judging, change)
    if (said.length > 0) {
      return {
        refusals: [
          ...said.map((one) => `${one.path} — ${one.reason}`),
          `nothing was written — ${changes.length} change(s) were asked for and they land together or not at all`,
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
    const now = baseOf(root)
    const reached = reachedSince(root, base, now)
    if (reached === null || reached.length > 0) {
      return {
        refusals: [
          reached === null
            ? `what reached \`${INSIDE}/\` between \`${base}\` and \`${now}\` would not read, so what was judged cannot be shown to be what stands`
            : `a commit reaching \`${INSIDE}/\` landed while this change was judged, so what was judged is not what stands — it moved ${reached.length} path(s): ${oneLine(reached.join(", "))}`,
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
        const commit = committed(root, put.wrote, put.took, message, writer, base)
        return { base, commit, wrote: put.wrote, took: put.took, noted }
      } catch (thrown) {
        back()
        throw thrown
      }
    } catch (thrown) {
      restored(root, before)
      throw thrown
    }
  })
}
