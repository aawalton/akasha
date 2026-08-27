import { createHash } from "node:crypto"
import { existsSync, mkdirSync, readFileSync, statSync } from "node:fs"
import { gitCapped } from "../../repo/git/git.ts"
import { writeWhole } from "../../write-whole/write-whole.ts"
import type { Property } from "./property.ts"
import type { FileTree } from "../file-tree.ts"
import { RUNTIME_MARK } from "../runtime/runtime.ts"
import { folderIn, PAGE_PROPERTY_TYPE_GLOB, PAGE_TYPE_GLOBS, PROPERTY_GLOBS } from "../page-types.ts"

const VERSION = 5

const CACHE_AT = ".git/pages/resolved/page-type"

/**
 * The folders of akasha holding the code an answer is worked out by.
 *
 * READ AGAINST AKASHA WHICHEVER REPO'S PAGES ARE BEING RESOLVED. Both tree builders set
 * `root` from `rootFor(roots, AKASHA)`, so `tree.root` is akasha's root and these paths are
 * akasha-relative — the same root the property folders below are read against.
 *
 * A FOLDER HERE COVERS EVERYTHING UNDER IT, because the ground takes the folder's tree oid.
 * So `page` stands for every file beneath it and no nested folder is named beside it.
 */
export const CODE_AT: readonly string[] = [
  "cache",
  "checks-system/refusal",
  "during-call",
  "exclusive",
  "page",
  "pages-system/page-type",
  "repo",
  "write-whole",
]

/**
 * Where a walk over the answering code starts: the answer, and the key it is filed under.
 *
 * `propertiesFor` in the first works out the `Answer` this keeps; `keyFor` in the second works
 * out what that answer is filed under. `type-cache.unit.test.ts` walks the imports from here and
 * fails where one reaches a file no folder in `CODE_AT` covers.
 */
export const ANSWER_SEEDS: readonly string[] = ["page/property/frontmatter.ts", "page/property/type-cache.ts"]

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

/**
 * The named folders that stand, dropping those that do not.
 *
 * A PROPERTY FOLDER THAT IS NOT THERE IS A REPO WITHOUT THOSE PAGES. Its name is worked out from
 * the same `placeOf` the rest of the system files those pages by, so it cannot drift out of step
 * with what is on disk: absent means nothing is filed there, and the ground says so by leaving it
 * out. `CODE_AT` is a hand-kept list with no such tie, which is why it goes through `codeIn`.
 */
function presentIn(root: string, named: readonly string[]): readonly string[] {
  return [...new Set(named)].sort().filter((at) => existsSync(`${root}/${at}`))
}

/**
 * Every folder of `CODE_AT`, or nothing.
 *
 * A DECLARED CODE FOLDER THAT IS NOT THERE IS A FAULT IN `CODE_AT`, NEVER A REPO WITHOUT IT.
 * Dropped instead, the ground is built from whichever of them happen to stand, and it is then
 * stable while the code it left out changes — so an edit to the answering code does not move the
 * key and the cache hands back what an older version of that code worked out. That is what a
 * rename here costs, and nothing else catches it. Refusing the ground costs a recomputation.
 */
function codeIn(root: string): readonly string[] | null {
  const named = [...new Set(CODE_AT)].sort()
  return named.every((at) => existsSync(`${root}/${at}`)) ? named : null
}

function foldersIn(root: string): readonly string[] {
  return presentIn(root, [...PROPERTY_GLOBS, PAGE_PROPERTY_TYPE_GLOB].map(folderIn))
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
  const code = codeIn(root)
  if (code === null) return null
  const types = typeFoldersIn(root)
  if (types.length === 0) return null
  if (!existsSync(`${root}/${IGNORE_AT}`)) return null
  const named = [...foldersIn(root), ...code, IGNORE_AT]
  const recorded = recordedFor(root, named)
  if (recorded === null) return null
  if (!matchesHead(root, [...named, ...types])) return null
  const blobs = blobsUnder(root, types)
  if (blobs === null) return null
  const inputs = named.map((at, index) => `${at}:${recorded[index]}`)
  inputs.push(RUNTIME_MARK)
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
