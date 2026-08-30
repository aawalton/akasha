import { execFileSync } from "node:child_process"
import { existsSync } from "node:fs"
import { join } from "node:path"

export const UNNAMED = "unnamed"

export function gitIn(root: string, argv: readonly string[]): string {
  return execFileSync("git", ["-C", root, ...argv], {
    encoding: "utf8",
    maxBuffer: 64 * 1024 * 1024,
  })
}

function nameOf(root: string): string {
  try {
    return gitIn(root, ["rev-parse", "HEAD"]).trim()
  } catch {
    return UNNAMED
  }
}

function carrying(
  root: string,
  commit: string,
  wrote: readonly string[],
  took: readonly string[]
): boolean {
  const paths = [...wrote, ...took]
  let held: Set<string>
  try {
    const said = gitIn(root, ["ls-tree", "-r", "--name-only", "-z", commit, "--", ...paths])
    held = new Set(said.split("\0").filter((one) => one !== ""))
  } catch {
    return false
  }
  if (wrote.some((one) => !held.has(one))) return false
  if (took.some((one) => held.has(one))) return false
  try {
    gitIn(root, ["diff", "--quiet", commit, "--", ...paths])
  } catch {
    return false
  }
  return true
}

function staged(root: string, paths: readonly string[]): undefined {
  for (const one of paths) {
    try {
      gitIn(root, ["add", "--intent-to-add", "--", one])
    } catch (thrown) {
      if (existsSync(join(root, one))) throw thrown
    }
  }
}

export function committed(
  root: string,
  wrote: readonly string[],
  took: readonly string[],
  message: string,
  writer: string | null,
  base: string
): string | null {
  const paths = [...wrote, ...took].sort()
  staged(root, paths)
  try {
    gitIn(root, ["diff", "--quiet", "HEAD", "--", ...paths])
    return null
  } catch {}
  const named = writer === null ? [] : [`--author=${writer}`]
  try {
    gitIn(root, ["commit", ...named, "-m", message, "--", ...paths])
  } catch (thrown) {
    const now = nameOf(root)
    if (now === base || now === UNNAMED) throw thrown
    if (!carrying(root, now, wrote, took)) throw thrown
    return now
  }
  return nameOf(root)
}
