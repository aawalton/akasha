import { createHash } from "node:crypto"
import { existsSync } from "node:fs"
import { gitCapped } from "../../repo/git/git.ts"
import { AKASHA, akashaRoot, REPOS } from "../../repo/roots/roots.ts"
import type { FileTree } from "../file-tree.ts"
import type { Roots } from "../page.ts"
import { RUNTIME_MARK } from "../runtime/runtime.ts"
import { folderIn, PAGE_SHAPE_GLOBS, PAGE_TYPE_GLOBS } from "../page-types.ts"

export const CODE_DIRS: readonly string[] = [
  "cache",
  "during-call",
  "exclusive",
  "missing",
  "page",
  "pages-system/page-type",
  "refusal",
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

const PAGE_SHAPE_NAMED: readonly string[] = [
  ...new Set(PAGE_SHAPE_GLOBS.map((one) => one.slice(one.lastIndexOf("/") + 1))),
]

interface Ground {
  readonly base: string
  readonly blobs: ReadonlyMap<string, string>
}

function presentIn(root: string, globs: readonly string[]): readonly string[] {
  return [...new Set(globs.map(folderIn))].filter((at) => existsSync(`${root}/${at}`)).sort()
}

function recordedAt(root: string, dirs: readonly string[]): readonly string[] | null {
  const found = gitCapped(root, ["rev-parse", ...dirs.map((at) => `HEAD:${at}`)])
  if (found.code !== 0) return null
  const oids = found.stdout.split("\n").filter((one) => one !== "")
  return oids.length === dirs.length ? oids : null
}

function matchesCommit(root: string, dirs: readonly string[]): boolean {
  return gitCapped(root, ["diff-index", "--quiet", "HEAD", "--", ...dirs]).code === 0
}

function blobsUnder(root: string, dirs: readonly string[]): ReadonlyMap<string, string> | null {
  const listed = gitCapped(root, ["ls-tree", "-r", "HEAD", "--", ...dirs])
  if (listed.code !== 0) return null
  const blobs = new Map<string, string>()
  for (const line of listed.stdout.split("\n")) {
    if (line === "") continue
    const [head, at] = line.split("\t")
    const oid = head?.split(" ")[2]
    if (at !== undefined && oid !== undefined) blobs.set(at, oid)
  }
  return blobs
}

function blobsNamed(root: string): ReadonlyMap<string, string> | null {
  const listed = gitCapped(root, ["ls-files", "-s", "--", ...PAGE_SHAPE_NAMED])
  if (listed.code !== 0) return null
  const blobs = new Map<string, string>()
  for (const line of listed.stdout.split("\n")) {
    if (line === "") continue
    const [head, at] = line.split("\t")
    const oid = head?.split(" ")[1]
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
  parts.push(RUNTIME_MARK)
  return { base: parts.join("\n"), blobs }
}

function repoParts(
  repo: string,
  root: string
): { readonly parts: readonly string[]; readonly blobs: ReadonlyMap<string, string> } | null {
  if (gitCapped(root, ["diff-index", "--quiet", "HEAD", "--", ...PAGE_SHAPE_NAMED]).code !== 0) return null
  const blobs = blobsNamed(root)
  if (blobs === null) return null
  const parts = [...blobs.keys()].sort().map((at) => `${repo}/${at}:${blobs.get(at)}`)
  const dirs = presentIn(root, PAGE_SHAPE_GLOBS)
  if (dirs.length > 0) {
    const oids = recordedAt(root, dirs)
    if (oids === null) return null
    if (!matchesCommit(root, dirs)) return null
    parts.push(...dirs.map((at, index) => `${repo}/${at}:${oids[index]}`))
  }
  return { parts, blobs }
}

export function groundSpanning(roots: Roots): Ground | null {
  const own = ownCodeParts()
  if (own === null) return null
  const parts: string[] = []
  const blobs = new Map<string, string>()
  for (const repo of REPOS) {
    const root = roots[repo]
    if (root === undefined) continue
    const one = repoParts(repo, root)
    if (one === null) return null
    parts.push(...one.parts)
    for (const [at, oid] of one.blobs) blobs.set(at, oid)
  }
  if (blobs.size === 0) return null
  parts.push(...own)
  parts.push(RUNTIME_MARK)
  return { base: parts.join("\n"), blobs }
}

const grounds = new WeakMap<FileTree, Ground | null>()

function groundOf(tree: FileTree): Ground | null {
  const held = grounds.get(tree)
  if (held !== undefined) return held
  const root = tree.root
  const spanned = tree.roots
  const made =
    (tree.pending?.size ?? 0) > 0
      ? null
      : spanned !== undefined
        ? groundSpanning(spanned)
        : root === undefined
          ? null
          : groundOverCommit(root)
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
