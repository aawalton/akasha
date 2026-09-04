import { mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { decodeUtf8 } from "@akasha/code-system/utf8-body"
import { argvFor, said as gitSaid, told as gitTold } from "@akasha/git/git-running"
import { bytes as ranBytes, said as ranSaid } from "@akasha/utils-run/running"
import { bodyRead } from "../differing/differing.module.code.ts"
import { SCRATCH_AT } from "../scratching/scratching.module.code.ts"

const ZERO = "0000000000000000000000000000000000000000"
const MODE = "100644"
const PREFIX = "akasha-patch-index-"
const KEPT = "refs/akasha/patch"
const HEADER = "diff --git "
const BINARY = "GIT binary patch"
const AS_BYTES = " -diff"
const ATTRIBUTES = "attributes"
const NEWLINE = 10
const SIDES = 5

export type Change = {
  readonly path: string
  readonly body: Uint8Array | null
}

export type Blobs = {
  readonly base: string
  readonly result: string
}

function envFor(index: string): Record<string, string | undefined> {
  return { ...process.env, GIT_INDEX_FILE: index, GIT_ATTR_NOSYSTEM: "1" }
}

function indexed(root: string, argv: readonly string[], index: string): string {
  return ranSaid(argvFor(root, argv), { env: envFor(index) })
}

function diffed(
  root: string,
  argv: readonly string[],
  index: string,
  attributes: string | null
): Uint8Array {
  const named = attributes === null ? argv : ["-c", `core.attributesFile=${attributes}`, ...argv]
  const said = ranBytes(argvFor(root, named), { env: envFor(index) })
  if (said.code !== 0) throw new Error(`\`git diff\` would not run — ${said.err.trim()}`)
  return said.out
}

export function blobFor(root: string, path: string, body: Uint8Array): string {
  return gitSaid(root, ["hash-object", "-w", "--stdin", "--path", path], { stdin: body }).trim()
}

function pathBetween(header: string): string | null {
  const said = header.slice(HEADER.length)
  const half = (said.length - SIDES) / 2
  if (!Number.isInteger(half) || half <= 0) return null
  if (said.slice(0, 2) !== "a/" || said.slice(2 + half, SIDES + half) !== " b/") return null
  const path = said.slice(2, 2 + half)
  return path === said.slice(SIDES + half) ? path : null
}

function linesIn(patch: Uint8Array): readonly Uint8Array[] {
  const held: Uint8Array[] = []
  let from = 0
  for (let at = 0; at < patch.length; at++) {
    if (patch[at] !== NEWLINE) continue
    held.push(patch.subarray(from, at))
    from = at + 1
  }
  if (from < patch.length) held.push(patch.subarray(from))
  return held
}

function bytesPaths(patch: Uint8Array): readonly string[] {
  const named: string[] = []
  let at: string | null = null
  let text = true
  for (const line of linesIn(patch)) {
    const said = decodeUtf8(line)
    if (said === null) {
      text = false
      continue
    }
    if (!said.startsWith(HEADER)) continue
    if (at !== null && !text) named.push(at)
    at = pathBetween(said)
    text = true
  }
  if (at !== null && !text) named.push(at)
  return named
}

function markedAt(world: string, named: readonly string[]): string {
  const at = join(world, ATTRIBUTES)
  writeFileSync(at, named.map((one) => `/${one}${AS_BYTES}\n`).join(""))
  return at
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
    const first = diffed(root, argv, index, null)
    const said = decodeUtf8(first)
    if (said !== null) return said
    const again = diffed(root, argv, index, markedAt(world, bytesPaths(first)))
    const held = decodeUtf8(again)
    if (held === null) throw new Error("a patch would carry bytes git will not draw as a diff")
    return held
  } finally {
    rmSync(world, { recursive: true, force: true })
  }
}

export function blobsIn(patch: string): ReadonlyMap<string, Blobs> {
  const found = new Map<string, Blobs>()
  let blobs: Blobs | null = null
  let at: string | null = null
  let past = false
  const close = (): undefined => {
    if (at !== null && blobs !== null) found.set(at, blobs)
    blobs = null
    past = false
  }
  for (const line of patch.split("\n")) {
    if (line.startsWith(HEADER)) {
      close()
      at = pathBetween(line)
    } else if (past) {
    } else if (line.startsWith("@@") || line.startsWith(BINARY)) {
      past = true
    } else if (line.startsWith("index ")) {
      const named = (line.slice("index ".length).split(" ")[0] ?? "").split("..")
      const one = named[0]
      const two = named[1]
      if (one !== undefined && two !== undefined) blobs = { base: one, result: two }
    }
  }
  close()
  return found
}

export function added(blobs: Blobs): boolean {
  return blobs.base === ZERO
}

export function deleted(blobs: Blobs): boolean {
  return blobs.result === ZERO
}

export function bodyOf(root: string, blob: string): Uint8Array | null {
  return blob === ZERO ? null : bodyRead(root, blob)
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
