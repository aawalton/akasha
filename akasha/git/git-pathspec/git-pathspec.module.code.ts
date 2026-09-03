import { existsSync } from "node:fs"
import { join } from "node:path"
import {
  type GitResult,
  git,
  ranGit as ran,
  gitTextOf as text,
} from "../git-capping/git-capping.module.code.ts"

const PATHSPEC_CEILING = 100_000

function overCeiling(paths: readonly string[]): boolean {
  let held = 0
  for (const one of paths) {
    held += one.length + 1
    if (held > PATHSPEC_CEILING) return true
  }
  return false
}

function inBatches(paths: readonly string[]): readonly (readonly string[])[] {
  const batches: string[][] = []
  let batch: string[] = []
  let held = 0
  for (const one of paths) {
    if (held + one.length + 1 > PATHSPEC_CEILING && batch.length > 0) {
      batches.push(batch)
      batch = []
      held = 0
    }
    batch.push(one)
    held += one.length + 1
  }
  if (batch.length > 0) batches.push(batch)
  return batches
}

export function gitWritingPaths(
  root: string,
  args: readonly string[],
  paths: readonly string[]
): GitResult {
  if (!overCeiling(paths)) return git(root, [...args, "--", ...paths])
  const proc = ran(root, [...args, "--pathspec-from-file=-", "--pathspec-file-nul"], {
    input: new TextEncoder().encode(paths.join("\0")),
  })
  return { code: proc.code, stdout: text(proc.stdout), stderr: text(proc.stderr) }
}

export function gitAskingPaths(
  root: string,
  args: readonly string[],
  paths: readonly string[]
): GitResult {
  const said: string[] = []
  for (const some of inBatches(paths)) {
    const got = git(root, [...args, "--", ...some])
    if (got.code !== 0) return got
    if (got.stdout !== "") said.push(got.stdout)
  }
  return { code: 0, stdout: said.join("\0"), stderr: "" }
}

export function gitIgnoring(root: string, paths: readonly string[]): ReadonlySet<string> | null {
  if (paths.length === 0) return new Set()
  const proc = ran(root, ["check-ignore", "--stdin", "-z"], {
    input: new TextEncoder().encode(paths.join("\0")),
  })
  if (proc.code !== 0 && proc.code !== 1) return null
  return new Set(
    new TextDecoder()
      .decode(proc.stdout)
      .split("\0")
      .filter((one) => one !== "")
  )
}

export function heldByRepo(root: string, paths: readonly string[]): ReadonlySet<string> {
  const held = new Set(paths.filter((one) => existsSync(join(root, one))))
  const missing = paths.filter((one) => !held.has(one))
  if (missing.length === 0) return held
  for (const args of [
    ["ls-files", "--cached", "-z"],
    ["ls-tree", "-r", "--name-only", "-z", "HEAD"],
  ]) {
    const got = gitAskingPaths(root, args, missing)
    if (got.code !== 0) continue
    for (const name of got.stdout.split("\0")) if (name !== "") held.add(name)
  }
  return held
}

export function unknownToGit(root: string, paths: readonly string[]): readonly string[] {
  const missing = paths.filter((one) => !existsSync(join(root, one)))
  if (missing.length === 0) return []
  const known = new Set<string>()
  for (const args of [
    ["ls-files", "--cached", "-z"],
    ["ls-tree", "-r", "--name-only", "-z", "HEAD"],
  ]) {
    const got = gitAskingPaths(root, args, missing)
    if (got.code !== 0) return []
    for (const name of got.stdout.split("\0")) if (name !== "") known.add(name)
  }
  return missing.filter((one) => !known.has(one))
}
