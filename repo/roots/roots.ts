import { existsSync, readdirSync } from "node:fs"
import { resolve } from "node:path"
import { canonicalize } from "../path/path.ts"
import type { Repo } from "../../page/document/types.ts"
import { pageNameOf } from "../../page/name/name.ts"
import { pageFileIn } from "../../page/page-file.ts"
import type { Roots } from "../../page/page.ts"

export const AKASHA = "akasha"

export const INSTRUCTIONS = "instructions"

export const SIBLING = AKASHA

export const HERE = resolve(import.meta.dir, "..", "..")

export const QUARANTINE_ROOT = "dirty"

export const VENDOR_ROOT = "node_modules"

const REPO_PAGES = "pages/repo"

const REPO_ENDING = "-repo"

export function rootEnvName(repo: string): string {
  return `${repo.replaceAll("-", "_").toUpperCase()}_ROOT`
}

const OWN = process.env[rootEnvName(INSTRUCTIONS)] ?? resolve(HERE, "..", INSTRUCTIONS)

export function ownRepoRoot(): string {
  return OWN
}

function namedOnDisk(): readonly string[] {
  const at = `${OWN}/${REPO_PAGES}`
  const found = new Set<string>()
  for (const one of readdirSync(at)) {
    const named = pageNameOf(one)
    if (named === null) continue
    if (!named.stem.endsWith(REPO_ENDING)) continue
    found.add(named.stem.slice(0, -REPO_ENDING.length))
  }
  if (found.size === 0) {
    throw new Error(
      `${at} holds no \`*${REPO_ENDING}\` page, so nothing says which repositories there are`
    )
  }
  return [...found].sort()
}

export const REPOS = namedOnDisk()

export const ADDRESSABLE = REPOS

export type Addressable = Repo

export const ADDRESSABLE_NAMED = REPOS.map((one) => `\`${one}\``).join(", ")

export function reposNamed(): readonly string[] {
  return REPOS
}

export function isAddressable(value: string): value is Addressable {
  return REPOS.includes(value)
}

export function isDirty(relPath: string): boolean {
  return relPath.split("/")[0] === QUARANTINE_ROOT
}

export function isVendored(relPath: string): boolean {
  return relPath.split("/")[0] === VENDOR_ROOT
}

export function repoPagePath(repo: string): string {
  const stem = `${repo}${REPO_ENDING}`
  return `${OWN}/${pageFileIn(OWN, REPO_PAGES, stem) ?? `${REPO_PAGES}/${stem}.md`}`
}

function rootOf(repo: string): string {
  const stated = process.env[rootEnvName(repo)]
  if (stated !== undefined) return resolve(stated)
  if (repo === INSTRUCTIONS) return OWN
  if (repo === AKASHA) return HERE
  return resolve(OWN, "..", repo)
}

export function akashaRoot(): string {
  return rootOf(AKASHA)
}

function clonedHere(): Roots {
  const at: Record<string, string> = {}
  for (const repo of REPOS) {
    const root = rootOf(repo)
    if (existsSync(`${root}/.git`)) at[repo] = root
  }
  return at
}

let held: Roots | null = null

export function rootsHere(): Roots {
  if (held === null) held = clonedHere()
  return held
}

export function resolveRoots(target: Repo = INSTRUCTIONS): Roots {
  const at: Record<string, string> = {}
  for (const repo of REPOS) at[repo] = canonicalize(rootOf(repo))
  return { ...at, target }
}

export function targetRepo(roots: Roots): Repo {
  return roots.target ?? INSTRUCTIONS
}

export function targetRoot(roots: Roots): string {
  return roots[targetRepo(roots)]
}

export interface Touched {
  readonly repo: string
  readonly relPath: string
}

export function locate(absolute: string, roots: Roots = rootsHere()): Touched | null {
  const at = canonicalize(absolute)
  for (const repo of REPOS) {
    const root = roots[repo]
    if (root === undefined) continue
    const real = canonicalize(root)
    if (at === real) return { repo, relPath: "" }
    if (at.startsWith(`${real}/`)) return { repo, relPath: at.slice(real.length + 1) }
  }
  return null
}
