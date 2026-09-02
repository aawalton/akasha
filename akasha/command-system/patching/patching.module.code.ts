import { mkdtempSync, rmSync } from "node:fs"
import { join } from "node:path"
import { argvFor, said as gitSaid, told as gitTold } from "@akasha/git/git-running"
import { said as ranSaid } from "@akasha/utils-run/running"
import { bodyRead } from "../differing/differing.module.code.ts"
import { SCRATCH_AT } from "../scratching/scratching.module.code.ts"

const ZERO = "0000000000000000000000000000000000000000"
const MODE = "100644"
const PREFIX = "akasha-patch-index-"
const KEPT = "refs/akasha/patch"

export type Change = {
  readonly path: string
  readonly body: string | null
}

export type Blobs = {
  readonly base: string
  readonly result: string
}

function indexed(root: string, argv: readonly string[], index: string): string {
  return ranSaid(argvFor(root, argv), { env: { ...process.env, GIT_INDEX_FILE: index } })
}

export function blobFor(root: string, path: string, body: string): string {
  const held = new TextEncoder().encode(body)
  return gitSaid(root, ["hash-object", "-w", "--stdin", "--path", path], { stdin: held }).trim()
}

export function patchOf(root: string, base: string, changes: readonly Change[]): string {
  if (changes.length === 0) return ""
  const world = mkdtempSync(join(SCRATCH_AT, PREFIX))
  try {
    const index = join(world, "index")
    for (const one of changes) {
      if (one.body === null) continue
      const blob = blobFor(root, one.path, one.body)
      const named = `${MODE},${blob},${one.path}`
      indexed(root, ["update-index", "--add", "--cacheinfo", named], index)
    }
    const argv = [
      "diff",
      "--cached",
      "--binary",
      "--full-index",
      "--no-ext-diff",
      "--no-textconv",
      "--no-renames",
      "--no-color",
      base,
      "--",
      ...changes.map((one) => one.path),
    ]
    return indexed(root, argv, index)
  } finally {
    rmSync(world, { recursive: true, force: true })
  }
}

function pathIn(said: string): string | null {
  if (said === "/dev/null") return null
  if (said.startsWith('"')) return null
  return said.slice(2)
}

export function blobsIn(patch: string): ReadonlyMap<string, Blobs> {
  const found = new Map<string, Blobs>()
  let blobs: Blobs | null = null
  let was: string | null = null
  let past = false
  for (const line of patch.split("\n")) {
    if (line.startsWith("diff --git ")) {
      blobs = null
      was = null
      past = false
    } else if (past) {
    } else if (line.startsWith("@@") || line.startsWith("GIT binary patch")) {
      past = true
    } else if (line.startsWith("index ")) {
      const named = (line.slice("index ".length).split(" ")[0] ?? "").split("..")
      const one = named[0]
      const two = named[1]
      if (one !== undefined && two !== undefined) blobs = { base: one, result: two }
    } else if (line.startsWith("--- ")) {
      was = pathIn(line.slice(4))
    } else if (line.startsWith("+++ ")) {
      const at = pathIn(line.slice(4)) ?? was
      if (at !== null && blobs !== null) found.set(at, blobs)
      blobs = null
      was = null
    }
  }
  return found
}

export function added(blobs: Blobs): boolean {
  return blobs.base === ZERO
}

export function deleted(blobs: Blobs): boolean {
  return blobs.result === ZERO
}

export function bodyOf(root: string, blob: string): string | null {
  if (blob === ZERO) return null
  const held = bodyRead(root, blob)
  return held === null ? null : new TextDecoder().decode(held)
}

function refFor(at: string): string {
  return `${KEPT}/${at}`
}

export function keepBlobs(root: string, at: string, patch: string): undefined {
  const world = mkdtempSync(join(SCRATCH_AT, PREFIX))
  try {
    const index = join(world, "index")
    for (const [path, blobs] of blobsIn(patch)) {
      if (deleted(blobs)) continue
      const named = `${MODE},${blobs.result},${path}`
      indexed(root, ["update-index", "--add", "--cacheinfo", named], index)
    }
    const tree = indexed(root, ["write-tree"], index).trim()
    gitSaid(root, ["update-ref", refFor(at), tree])
  } finally {
    rmSync(world, { recursive: true, force: true })
  }
}

export function dropBlobs(root: string, at: string): undefined {
  gitTold(root, ["update-ref", "-d", refFor(at)])
}
