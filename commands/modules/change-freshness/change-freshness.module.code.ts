import { readFileSync } from "node:fs"
import { join } from "node:path"
import {
  blobIdOf,
  type Reading,
  sameBody,
} from "akasha/agents/read-record/read-record.module.code.ts"
import { bodyAt } from "akasha/git/commit-reading/commit-reading.module.code.ts"
import { said as gitIn, told } from "akasha/git/running/git-running.module.code.ts"
import {
  type Facing,
  facingOn,
  writerAt,
} from "akasha/pages/indexes/property-carrying/property-carrying.module.code.ts"

const HERE = "."

const NONE: ReadonlySet<string> = new Set()

export const PUT_BACK = "so writing it would put back what moved in between"

function sameBytes(one: Uint8Array | null, two: Uint8Array | null): boolean {
  if (one === null || two === null) return one === two
  return Buffer.from(one).equals(Buffer.from(two))
}

function pathsIn(said: string | null): readonly string[] | null {
  return said === null ? null : said.split("\0").filter((one) => one !== "")
}

function changedSince(
  repo: string,
  commit: string,
  head: string,
  tree: string
): readonly string[] | null {
  return pathsIn(
    told(repo, ["diff", "--name-only", "--no-renames", "-z", commit, head, "--", tree])
  )
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

export function reachedSince(root: string, base: string, now: string): readonly string[] | null {
  if (now === base) return []
  const found = changedSince(root, base, now, HERE)
  return found === null ? null : [...found].sort()
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

export function machineWrote(given: Facing, paths: Iterable<string>): ReadonlySet<string> {
  const made = new Set<string>()
  for (const one of paths) if (writerAt(given, one) !== null) made.add(one)
  return made
}

function groupWrote(root: string, paths: readonly string[]): ReadonlySet<string> {
  if (paths.length === 0) return NONE
  try {
    return machineWrote(facingOn(root), paths)
  } catch {
    return NONE
  }
}

function unfreshPast(
  machine: ReadonlySet<string>,
  root: string,
  named: string | null,
  base: string,
  paths: readonly string[],
  asRead: readonly Reading[],
  tail: string
): readonly string[] | null {
  const held = paths.filter((one) => !machine.has(one))
  const moved = named === null || named === base ? [] : movedBetween(root, named, base, held)
  if (named !== null && moved.length > 0) {
    return [
      ...moved.map(
        (one) =>
          `${one} — read against \`${named}\`, and what is at \`${base}\` is not what was read, ${PUT_BACK}`
      ),
      tail,
    ]
  }
  const stirred = movedOnDisk(
    root,
    base,
    asRead.filter((one) => !machine.has(one.path))
  )
  if (stirred.length === 0) return null
  return [
    ...stirred.map((one) => `${one} — what is on disk is not the body you read, ${PUT_BACK}`),
    tail,
  ]
}

export function unfreshOver(
  given: Facing,
  root: string,
  named: string | null,
  base: string,
  paths: readonly string[],
  asRead: readonly Reading[],
  tail: string
): readonly string[] | null {
  const pathed = [...paths, ...asRead.map((one) => one.path)]
  return unfreshPast(machineWrote(given, pathed), root, named, base, paths, asRead, tail)
}

export function unfresh(
  root: string,
  named: string | null,
  base: string,
  paths: readonly string[],
  asRead: readonly Reading[],
  tail: string
): readonly string[] | null {
  const pathed = [...paths, ...asRead.map((one) => one.path)]
  return unfreshPast(groupWrote(root, pathed), root, named, base, paths, asRead, tail)
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
