import { createHash } from "node:crypto"
import { existsSync } from "node:fs"
import { AKASHA, akashaRoot } from "../../repo/roots/roots.ts"
import type { FileTree } from "../file-tree.ts"
import { PAGE_SHAPE_GLOBS, PAGE_TYPE_GLOBS } from "../page-types.ts"

export const CODE_DIRS: readonly string[] = [
  "cache",
  "checks/refusal",
  "during-call",
  "exclusive",
  "page",
  "repo",
  "write-whole",
]

export const CODE_SEEDS: readonly string[] = [
  "page/file-tree.ts",
  "page/page-types.ts",
  "page/property/type-cache.ts",
  "page/property/value.ts",
  "page/shape/shape.ts",
]

const GIT_CEILING_MS = 10_000

interface Ran {
  readonly code: number
  readonly out: string
}

function git(root: string, args: readonly string[]): Ran {
  const done = Bun.spawnSync(["git", ...args], { cwd: root, timeout: GIT_CEILING_MS })
  return { code: done.exitCode ?? -1, out: done.stdout.toString().trim() }
}

interface Ground {
  readonly base: string
  readonly blobs: ReadonlyMap<string, string>
}

function dirOf(glob: string): string {
  const star = glob.indexOf("*")
  return (star === -1 ? glob : glob.slice(0, star)).replace(/\/+$/, "")
}

function presentIn(root: string, globs: readonly string[]): readonly string[] {
  return [...new Set(globs.map(dirOf))].filter((at) => existsSync(`${root}/${at}`)).sort()
}

function recordedAt(root: string, dirs: readonly string[]): readonly string[] | null {
  const found = git(root, ["rev-parse", ...dirs.map((at) => `HEAD:${at}`)])
  if (found.code !== 0) return null
  const oids = found.out.split("\n").filter((one) => one !== "")
  return oids.length === dirs.length ? oids : null
}

function matchesCommit(root: string, dirs: readonly string[]): boolean {
  return git(root, ["diff-index", "--quiet", "HEAD", "--", ...dirs]).code === 0
}

function blobsUnder(root: string, dirs: readonly string[]): ReadonlyMap<string, string> | null {
  const listed = git(root, ["ls-tree", "-r", "HEAD", "--", ...dirs])
  if (listed.code !== 0) return null
  const blobs = new Map<string, string>()
  for (const line of listed.out.split("\n")) {
    if (line === "") continue
    const [head, at] = line.split("\t")
    const oid = head?.split(" ")[2]
    if (at !== undefined && oid !== undefined) blobs.set(at, oid)
  }
  return blobs
}

function ownCodeParts(): readonly string[] | null {
  const root = akashaRoot()
  const dirs = presentIn(root, CODE_DIRS)
  if (dirs.length !== CODE_DIRS.length) return null
  const oids = recordedAt(root, dirs)
  if (oids === null) return null
  if (!matchesCommit(root, dirs)) return null
  return dirs.map((at, index) => `${AKASHA}/${at}:${oids[index]}`)
}

export function groundOverCommit(root: string): Ground | null {
  const dirs = presentIn(root, PAGE_SHAPE_GLOBS)
  if (dirs.length === 0) return null
  const oids = recordedAt(root, dirs)
  if (oids === null) return null
  if (!matchesCommit(root, dirs)) return null
  const own = ownCodeParts()
  if (own === null) return null
  const blobs = blobsUnder(root, presentIn(root, PAGE_TYPE_GLOBS))
  if (blobs === null) return null
  const parts = dirs.map((at, index) => `${at}:${oids[index]}`)
  parts.push(...own)
  parts.push(`bun:${Bun.version}`)
  return { base: parts.join("\n"), blobs }
}

const grounds = new WeakMap<FileTree, Ground | null>()

function groundOf(tree: FileTree): Ground | null {
  const held = grounds.get(tree)
  if (held !== undefined) return held
  const root = tree.root
  const made = root === undefined || (tree.pending?.size ?? 0) > 0 ? null : groundOverCommit(root)
  grounds.set(tree, made)
  return made
}

export function shapeMarkOf(tree: FileTree): string | null {
  const ground = groundOf(tree)
  return ground === null ? null : createHash("sha256").update(ground.base).digest("hex")
}

export function typeMarkOf(tree: FileTree, relPaths: readonly string[]): string | null {
  const ground = groundOf(tree)
  if (ground === null) return null
  const named: string[] = []
  for (const at of relPaths) {
    const oid = ground.blobs.get(at)
    if (oid === undefined) return null
    named.push(`${at}:${oid}`)
  }
  return createHash("sha256").update(`${ground.base}\n${named.join("\n")}`).digest("hex")
}
