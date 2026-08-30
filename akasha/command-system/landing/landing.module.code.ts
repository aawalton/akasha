import { mkdirSync, rmSync, writeFileSync } from "node:fs"
import { createRequire } from "node:module"
import { dirname, join } from "node:path"
import type { Judged, Judging, Leaving } from "../../checks-system/judging/judging.module.code.ts"
import { textIn, textOf } from "../../code-system/body-text/body-text.module.code.ts"
import { indexIn } from "../../pages-system/indexes/index-reading/index-reading.module.code.ts"
import type { Indexing } from "../../pages-system/indexes/indexing/indexing.module.code.ts"
import { bodyAt, readingEnded } from "../commit-reading/commit-reading.module.code.ts"
import { committed, gitIn } from "../committing/committing.module.code.ts"
import { oneLine } from "../fault-saying/fault-saying.module.code.ts"
import { holding } from "../holding/holding.module.code.ts"
import type { Reading as AsRead } from "../reading/reading.module.code.ts"
import { rootOf } from "../rooting/rooting.module.code.ts"
import { INSIDE, movedOnDisk, reachedSince } from "../standing/standing.module.code.ts"

export type Change = {
  readonly path: string
  readonly body: Uint8Array | null
  readonly carried?: boolean
}

export type Proposed = {
  readonly base: string
  readonly changed: readonly Change[]
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

export const CHECKING_AT = "akasha/checks-system/checking/checking.module.code.ts"

export const INDEXING_AT = "akasha/pages-system/indexes/indexing/indexing.module.code.ts"

const HERE = rootOf(import.meta.path)

const CHECKING = join(HERE, CHECKING_AT)

const INDEXING = join(HERE, INDEXING_AT)

const PATCH = "patch"

const loadFrom = createRequire(import.meta.url)

export const NO_GATE: Judging = { named: [], over: () => [] }

export type Built = { readonly gate: Judging } | { readonly broken: string }

type Checking = {
  readonly checksIn: (root: string) => readonly unknown[]
  readonly checksAt: (every: readonly unknown[], phase: string) => readonly unknown[]
  readonly judgingBy: (every: readonly unknown[]) => Judging
}

function checkingLoaded(): Checking {
  const held = loadFrom(CHECKING) as Partial<Checking>
  const named = [held.checksIn, held.checksAt, held.judgingBy]
  if (named.some((one) => typeof one !== "function")) {
    throw new Error("it answers to no `checksIn`, `checksAt` and `judgingBy` a gate is built from")
  }
  return held as Checking
}

type Keeping = (root: string, repo: string) => Indexing

function indexingLoaded(): Keeping {
  const held = loadFrom(INDEXING) as { readonly indexingAt?: unknown }
  if (typeof held.indexingAt !== "function") {
    throw new Error(`${INDEXING_AT} answers to no \`indexingAt\` the index is kept by`)
  }
  return held.indexingAt as Keeping
}

export function gateBuilt(root: string): Built {
  try {
    const held = checkingLoaded()
    return { gate: held.judgingBy(held.checksAt(held.checksIn(root), PATCH)) }
  } catch (thrown) {
    return { broken: oneLine(thrown instanceof Error ? thrown.message : String(thrown)) }
  }
}

export function baseOf(root: string): string {
  return gitIn(root, ["rev-parse", "HEAD"]).trim()
}

export function leavingOf(root: string, proposed: Proposed): Leaving {
  const held = new Map<string, Uint8Array | null>()
  for (const one of proposed.changed) held.set(one.path, one.body)
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
    changed: proposed.changed.map((one) => one.path).sort(),
    at: (path) => {
      const said = held.get(path)
      if (said !== undefined) return said
      if (held.has(path)) return null
      return based(path)
    },
    was: based,
  }
}

function judged(judging: Judging, leaving: Leaving): readonly Judged[] {
  try {
    return judging.over(leaving)
  } finally {
    readingEnded()
  }
}

function wroteOnto(
  root: string,
  changed: readonly Change[]
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
  changed: readonly Change[]
): Map<string, Uint8Array | null> {
  const held = new Map<string, Uint8Array | null>()
  for (const one of changed) held.set(one.path, bodyAt(root, base, one.path))
  return held
}

function restored(root: string, before: ReadonlyMap<string, Uint8Array | null>): undefined {
  wroteOnto(
    root,
    [...before].map(([path, body]) => ({ path, body }))
  )
}

function indexed(
  root: string,
  changed: readonly Change[],
  before: ReadonlyMap<string, Uint8Array | null>,
  keeping: Keeping
): readonly string[] {
  const held = keeping(indexIn(root), root)
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
  changed: readonly Change[]
): readonly string[] {
  const moved: string[] = []
  for (const one of changed) {
    if (!sameBody(bodyAt(root, read, one.path), bodyAt(root, base, one.path))) moved.push(one.path)
  }
  return moved.sort()
}

export type Passed = (leaving: Leaving, changes: readonly Change[]) => readonly Change[]

type Settled = {
  readonly changes: readonly Change[]
  readonly before: Map<string, Uint8Array | null>
}

function settledOn(
  root: string,
  base: string,
  leaving: Leaving,
  changes: readonly Change[],
  passed: Passed | null
): Settled {
  try {
    const held = passed === null ? changes : passed(leaving, changes)
    return { changes: held, before: beforeOf(root, base, held) }
  } finally {
    readingEnded()
  }
}

export function landing(
  root: string,
  changes: readonly Change[],
  message: string,
  judging: Judging,
  writer: string | null = null,
  read: string | null = null,
  asRead: readonly AsRead[] = [],
  passed: Passed | null = null
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
    const proposed = { base, changed: changes }
    const leaving = leavingOf(root, proposed)
    const said = judged(judging, leaving)
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
    const settled = settledOn(root, base, leaving, changes, passed)
    const keeping = indexingLoaded()
    try {
      const put = wroteOnto(root, settled.changes)
      const noted = indexed(root, settled.changes, settled.before, keeping)
      const commit = committed(root, put.wrote, put.took, message, writer, base)
      return { base, commit, wrote: put.wrote, took: put.took, noted }
    } catch (thrown) {
      restored(root, settled.before)
      throw thrown
    }
  })
}
