import { createHash } from "node:crypto"
import { existsSync, mkdirSync, readFileSync, statSync } from "node:fs"
import { gitCapped } from "../../repo/git/git.ts"
import { writeWhole } from "../../write-whole/write-whole.ts"
import type { Property } from "./property.ts"
import type { FileTree } from "../file-tree.ts"
import { folderIn, PAGE_PROPERTY_TYPE_GLOB, PAGE_TYPE_GLOBS, PROPERTY_GLOBS } from "../page-types.ts"

const VERSION = 4

const CACHE_AT = ".git/pages/resolved/page-type"

const CODE_AT: readonly string[] = ["tools/page"]

const IGNORE_AT = ".gitignore"

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

interface Ground {
  readonly base: string
  readonly blobs: ReadonlyMap<string, string>
}

export interface Answer {
  readonly properties: readonly Property[] | null
  readonly why: string | null
}

interface Kept {
  readonly version: number
  readonly key: string
  readonly answer: Answer
}

function presentIn(root: string, named: readonly string[]): readonly string[] {
  return [...new Set(named)].sort().filter((at) => existsSync(`${root}/${at}`))
}

function foldersIn(root: string): readonly string[] {
  const named = [...PROPERTY_GLOBS, PAGE_PROPERTY_TYPE_GLOB].map(folderIn)
  return presentIn(root, [...named, ...CODE_AT])
}

function typeFoldersIn(root: string): readonly string[] {
  return presentIn(root, PAGE_TYPE_GLOBS.map(folderIn))
}

function recordedFor(root: string, named: readonly string[]): readonly string[] | null {
  const done = gitCapped(root, ["rev-parse", ...named.map((at) => `HEAD:${at}`)])
  if (done.code !== 0) return null
  const oids = done.stdout.split("\n").filter((one) => one !== "")
  return oids.length === named.length ? oids : null
}

function matchesHead(root: string, named: readonly string[]): boolean {
  if (gitCapped(root, ["diff-index", "--quiet", "HEAD", "--", ...named]).code !== 0) return false
  const loose = gitCapped(root, ["ls-files", "--others", "--exclude-standard", "--", ...named])
  return loose.code === 0 && loose.stdout === ""
}

function blobsUnder(root: string, folders: readonly string[]): ReadonlyMap<string, string> | null {
  const done = gitCapped(root, ["ls-tree", "-r", "HEAD", "--", ...folders])
  if (done.code !== 0) return null
  const blobs = new Map<string, string>()
  for (const line of done.stdout.split("\n")) {
    if (line === "") continue
    const [head, at] = line.split("\t")
    const oid = head?.split(" ")[2]
    if (at !== undefined && oid !== undefined) blobs.set(at, oid)
  }
  return blobs
}

function groundOver(root: string): Ground | null {
  const folders = foldersIn(root)
  const types = typeFoldersIn(root)
  if (types.length === 0) return null
  const named = [...folders, IGNORE_AT]
  if (!named.every((at) => existsSync(`${root}/${at}`))) return null
  const recorded = recordedFor(root, named)
  if (recorded === null) return null
  if (!matchesHead(root, [...named, ...types])) return null
  const blobs = blobsUnder(root, types)
  if (blobs === null) return null
  const inputs = named.map((at, index) => `${at}:${recorded[index]}`)
  inputs.push(`bun:${Bun.version}`)
  return { base: inputs.join("\n"), blobs }
}

const grounds = new WeakMap<FileTree, Ground | null>()

function groundFor(tree: FileTree): Ground | null {
  const held = grounds.get(tree)
  if (held !== undefined) return held
  const root = tree.root
  const made = root === undefined || (tree.pending?.size ?? 0) > 0 ? null : groundOver(root)
  grounds.set(tree, made)
  return made
}

export function keyFor(tree: FileTree, chain: readonly string[]): string | null {
  if (chain.length === 0) return null
  const ground = groundFor(tree)
  if (ground === null) return null
  const named: string[] = []
  for (const at of chain) {
    const oid = ground.blobs.get(at)
    if (oid === undefined) return null
    named.push(`${at}:${oid}`)
  }
  return createHash("sha256").update(`${ground.base}\n${named.join("\n")}`).digest("hex")
}

function cacheIn(root: string, slug: string): string | null {
  if (!SLUG.test(slug)) return null
  try {
    if (!statSync(`${root}/.git`).isDirectory()) return null
  } catch {
    return null
  }
  return `${root}/${CACHE_AT}/${slug}`
}

function readKept(at: string, key: string): Kept | null {
  try {
    const held = JSON.parse(readFileSync(at, "utf8")) as Kept
    return held.version === VERSION && held.key === key ? held : null
  } catch {
    return null
  }
}

export function keptAnswer(root: string, slug: string, key: string): Answer | null {
  const dir = cacheIn(root, slug)
  if (dir === null) return null
  const held = readKept(`${dir}/${key}.json`, key)
  return held === null ? null : held.answer
}

export function keepAnswer(root: string, slug: string, key: string, answer: Answer): void {
  const dir = cacheIn(root, slug)
  if (dir === null) return
  try {
    mkdirSync(dir, { recursive: true })
    writeWhole(`${dir}/${key}.json`, `${JSON.stringify({ version: VERSION, key, answer })}\n`)
  } catch {
    return
  }
}
