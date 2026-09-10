import { readFileSync } from "node:fs"
import { join } from "node:path"
import { said as gitIn, told } from "../../../git/git-running/git-running.module.code.ts"
import { sameBody as sameBytes } from "../body-merging/body-merging.module.code.ts"
import { bodyAt } from "../commit-reading/commit-reading.module.code.ts"
import { blobIdOf, type Reading, sameBody } from "../reading/reading.module.code.ts"

const HERE = "."

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

export function unfresh(
  root: string,
  named: string | null,
  base: string,
  paths: readonly string[],
  asRead: readonly Reading[],
  tail: string
): readonly string[] | null {
  const moved = named === null || named === base ? [] : movedBetween(root, named, base, paths)
  if (named !== null && moved.length > 0) {
    return [
      ...moved.map(
        (one) =>
          `${one} — read against \`${named}\`, and what is at \`${base}\` is not what was read, so writing it would put back what moved in between`
      ),
      tail,
    ]
  }
  const stirred = movedOnDisk(root, base, asRead)
  if (stirred.length === 0) return null
  return [
    ...stirred.map(
      (one) =>
        `${one} — what is on disk is not the body you read, so writing it would put back what moved in between`
    ),
    tail,
  ]
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
