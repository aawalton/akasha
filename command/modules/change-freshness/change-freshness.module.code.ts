import { readFileSync } from "node:fs"
import { join } from "node:path"
import {
  blobIdOf,
  type Reading,
  sameBody,
} from "akasha/agent/modules/read-record/read-record.module.code.ts"
import { foldedAt } from "akasha/command/modules/landing-change-composing/landing-change-composing.module.code.ts"
import { bodyAt } from "akasha/git/modules/commit-reading/commit-reading.module.code.ts"
import { said as gitIn } from "akasha/git/modules/running/git-running.module.code.ts"
import {
  type Facing,
  facingOn,
  generatedIn,
  writerAt,
} from "akasha/page/index/modules/property-carrying/property-carrying.module.code.ts"

const NONE: ReadonlySet<string> = new Set()

export const PUT_BACK = "so writing it would put back what moved in between"

export const ALREADY_HELD = "already holds this body, so this change writes nothing"

export const AGAIN_WORKED =
  "nothing was written — a body worked out by machine was worked out against an older commit," +
  " and another landing has moved it since. No edit is kept for such a path, so there is nothing" +
  " to drop — apply again, and it is worked out afresh against the commit at HEAD."

export function workedOnly(refusals: readonly string[]): boolean {
  return refusals.length === 2 && refusals[1] === AGAIN_WORKED
}

function sameBytes(one: Uint8Array | null, two: Uint8Array | null): boolean {
  if (one === null || two === null) return one === two
  return Buffer.from(one).equals(Buffer.from(two))
}

export function movedOnDisk(
  root: string,
  base: string,
  asRead: readonly Reading[]
): readonly string[] {
  const moved: string[] = []
  for (const one of asRead) {
    let held: Uint8Array | null = null
    try {
      held = readFileSync(join(root, one.path))
    } catch {}
    if (held === null && bodyAt(root, base, one.path) === null) continue
    if (!sameBody(one, held === null ? "" : blobIdOf(held))) moved.push(one.path)
  }
  return moved.sort()
}

function movedBetween(
  root: string,
  read: string,
  base: string,
  paths: readonly string[]
): readonly string[] {
  const moved: string[] = []
  for (const one of paths) {
    if (!sameBytes(bodyAt(root, read, one), bodyAt(root, base, one))) moved.push(one)
  }
  return moved.sort()
}

export type Machine = {
  readonly wrote: ReadonlySet<string>
  readonly grouped: ReadonlySet<string>
}

const NOTHING: Machine = { wrote: NONE, grouped: NONE }

export function machineWrote(given: Facing, paths: Iterable<string>): ReadonlySet<string> {
  const made = new Set<string>()
  for (const one of paths) if (generatedIn(given, one)) made.add(one)
  return made
}

export function groupsWrote(given: Facing, paths: Iterable<string>): ReadonlySet<string> {
  const made = new Set<string>()
  for (const one of paths) {
    try {
      if (writerAt(given, one) !== null) made.add(one)
    } catch {}
  }
  return made
}

function machineIn(given: Facing, paths: readonly string[]): Machine {
  return { wrote: machineWrote(given, paths), grouped: groupsWrote(given, paths) }
}

function groupWrote(root: string, paths: readonly string[]): Machine {
  if (paths.length === 0) return NOTHING
  try {
    return machineIn(facingOn(root), paths)
  } catch {
    return NOTHING
  }
}

function unfreshPast(
  machine: Machine,
  root: string,
  named: string | null,
  base: string,
  paths: readonly string[],
  asRead: readonly Reading[],
  tail: string
): readonly string[] | null {
  const held = paths.filter((one) => !machine.grouped.has(one) && !foldedAt(one))
  const moved = named === null || named === base ? [] : movedBetween(root, named, base, held)
  if (named !== null && moved.length > 0) {
    const worked = moved.some((one) => machine.wrote.has(one))
    const own = moved.some((one) => !machine.wrote.has(one))
    return [
      `${moved.join(", ")} — read against \`${named}\`, and what is at \`${base}\` is not ` +
        `what was read, ${PUT_BACK}`,
      ...(own ? [tail] : []),
      ...(worked ? [AGAIN_WORKED] : []),
    ]
  }
  const stirred = movedOnDisk(
    root,
    base,
    asRead.filter((one) => !machine.wrote.has(one.path) && !foldedAt(one.path))
  )
  if (stirred.length === 0) return null
  return [`${stirred.join(", ")} — what is on disk is not the body you read, ${PUT_BACK}`, tail]
}

export function machineOver(
  root: string,
  paths: readonly string[],
  asRead: readonly Reading[],
  given: Facing | null
): Machine {
  const pathed = [...paths, ...asRead.map((one) => one.path)]
  return given === null ? groupWrote(root, pathed) : machineIn(given, pathed)
}

export function unfresh(
  root: string,
  named: string | null,
  base: string,
  paths: readonly string[],
  asRead: readonly Reading[],
  tail: string,
  given: Facing | null = null,
  machine: Machine | null = null
): readonly string[] | null {
  const held = machine ?? machineOver(root, paths, asRead, given)
  return unfreshPast(held, root, named, base, paths, asRead, tail)
}

export function commitNamed(root: string, named: string): string | null {
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
