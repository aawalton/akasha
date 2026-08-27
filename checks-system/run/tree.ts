import { execFileSync } from "node:child_process"
import { readFileSync } from "node:fs"
import { resolve } from "node:path"
import type { Tree } from "../check/check-shape.ts"

const BUFFER_CEILING = 64 * 1024 * 1024

export function trackedIn(root: string, index: string | null): readonly string[] {
  const out = execFileSync("git", ["-C", root, "ls-files", "-z"], {
    maxBuffer: BUFFER_CEILING,
    env: index === null ? process.env : { ...process.env, GIT_INDEX_FILE: index },
  })
  return out
    .toString("utf8")
    .split("\0")
    .filter((one) => one !== "")
    .map((relPath) => resolve(root, relPath))
}

export function treeOn(
  root: string,
  changed: ReadonlyMap<string, Buffer | null>,
  paths: () => readonly string[],
  dir: () => string,
  goneElsewhere: () => readonly string[] = () => [],
  repointedElsewhere: () => ReadonlyMap<string, string> = () => new Map()
): Tree {
  let held: readonly string[] | null = null
  return {
    root,
    paths: () => {
      if (held === null) held = paths()
      return held
    },
    dir,
    gone: () => [...changed].flatMap(([at, body]) => (body === null ? [at] : [])),
    goneElsewhere,
    repointedElsewhere,
    at: (path) => {
      const held = changed.get(path)
      if (held !== undefined) return held
      if (changed.has(path)) return null
      try {
        return readFileSync(path)
      } catch {
        return null
      }
    },
  }
}

export function onDisk(root: string): Tree {
  return treeOn(root, new Map(), () => trackedIn(root, null), () => root)
}
