import { readFileSync } from "node:fs"
import { join } from "node:path"
import {
  blobIdOf,
  type Reading,
  sameBody,
} from "akasha/agent/modules/read-record/read-record.module.code.ts"
import { bodyAt } from "akasha/git/modules/commit-reading/commit-reading.module.code.ts"
import { said as gitIn } from "akasha/git/modules/running/git-running.module.code.ts"
import {
  type Facing,
  facingOn,
  writerAt,
} from "akasha/page/index/modules/property-carrying/property-carrying.module.code.ts"

const NONE: ReadonlySet<string> = new Set()

export const PUT_BACK = "so writing it would put back what moved in between"

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
      `${moved.join(", ")} — read against \`${named}\`, and what is at \`${base}\` is not ` +
        `what was read, ${PUT_BACK}`,
      tail,
    ]
  }
  const stirred = movedOnDisk(
    root,
    base,
    asRead.filter((one) => !machine.has(one.path))
  )
  if (stirred.length === 0) return null
  return [`${stirred.join(", ")} — what is on disk is not the body you read, ${PUT_BACK}`, tail]
}

export function unfresh(
  root: string,
  named: string | null,
  base: string,
  paths: readonly string[],
  asRead: readonly Reading[],
  tail: string,
  given: Facing | null = null
): readonly string[] | null {
  const pathed = [...paths, ...asRead.map((one) => one.path)]
  const machine = given === null ? groupWrote(root, pathed) : machineWrote(given, pathed)
  return unfreshPast(machine, root, named, base, paths, asRead, tail)
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
