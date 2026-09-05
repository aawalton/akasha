import { readFileSync } from "node:fs"
import { join } from "node:path"
import { told } from "@akasha/git/git-running"
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

export function movedOnDisk(root: string, asRead: readonly Reading[]): readonly string[] {
  const moved: string[] = []
  for (const one of asRead) {
    let oid = ""
    try {
      oid = blobIdOf(readFileSync(join(root, one.path)))
    } catch {}
    if (!sameBody(one, oid)) moved.push(one.path)
  }
  return moved.sort()
}

export function reachedSince(root: string, base: string, now: string): readonly string[] | null {
  if (now === base) return []
  const found = changedSince(root, base, now, HERE)
  return found === null ? null : [...found].sort()
}
