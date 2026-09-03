import { existsSync, readdirSync } from "node:fs"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"
import type { Repo } from "../pages/markdown-document/markdown-document.module.code.ts"
import type { Roots } from "../pages/markdown-page-at/markdown-page-at.module.code.ts"
import { canonicalize } from "../repo-path/repo-path.module.code.ts"

export const AKASHA = "akasha"

const REPO_PAGES = "akasha/infrastructure/repos/pages"

const REPO_ENDING = "-repo"

const PAGE_ENDING = ".ts"

function stemOf(name: string): string | null {
  if (!name.endsWith(PAGE_ENDING)) return null
  const rest = name.slice(0, -PAGE_ENDING.length)
  const dot = rest.lastIndexOf(".")
  if (dot <= 0 || dot === rest.length - 1) return null
  return rest.slice(0, dot)
}

function namedIn(at: string): readonly string[] {
  if (typeof readdirSync !== "function") {
    throw new Error(
      `nothing here reads a directory, so nothing says which repositories there are — this is not node`
    )
  }
  const found = new Set<string>()
  let entries: readonly string[]
  try {
    entries = readdirSync(at)
  } catch {
    return []
  }
  for (const one of entries) {
    const stem = stemOf(one)
    if (stem === null) continue
    if (!stem.endsWith(REPO_ENDING)) continue
    found.add(stem.slice(0, -REPO_ENDING.length))
  }
  return [...found].sort()
}

function namedUnder(root: string): readonly string[] {
  return namedIn(`${root}/${REPO_PAGES}`)
}

function checkoutFrom(dir: string): string {
  let at = resolve(dir)
  while (namedUnder(at).length === 0) {
    const up = dirname(at)
    if (up === at) return resolve(dir, "..", "..")
    at = up
  }
  return at
}

function dirOfThisFile(): string | undefined {
  const meta: { readonly dir?: string; readonly dirname?: string; readonly url?: string } =
    import.meta
  const named = meta.dir ?? meta.dirname
  if (named !== undefined) return named
  if (meta.url === undefined) return undefined
  if (typeof fileURLToPath !== "function") return undefined
  return dirname(fileURLToPath(meta.url))
}

function checkoutFound(): string {
  const dir = dirOfThisFile()
  if (dir === undefined || dir === "") {
    throw new Error(
      `nothing here says where this file is, so nothing says where \`${AKASHA}\` is — name it in \`${rootEnvName(AKASHA)}\``
    )
  }
  return checkoutFrom(dir)
}

let heldCheckout: string | null = null

export function checkoutHere(): string {
  if (heldCheckout === null) heldCheckout = checkoutFound()
  return heldCheckout
}

function akashaFound(): string {
  const stated = process.env[rootEnvName(AKASHA)]
  if (stated !== undefined && stated !== "") return resolve(stated)
  return checkoutHere()
}

let heldHere: string | null = null

export function akashaHere(): string {
  if (heldHere === null) heldHere = akashaFound()
  return heldHere
}

export const QUARANTINE_ROOT = "dirty"

export const VENDOR_ROOT = "node_modules"

export function rootEnvName(repo: string): string {
  return `${repo.replaceAll("-", "_").toUpperCase()}_ROOT`
}

export function ownRepoRoot(): string {
  return rootOf(AKASHA)
}

function namedOnDisk(): readonly string[] {
  const here = akashaHere()
  const own = namedUnder(here)
  if (own.length > 0) return own
  const at = `${here}/${REPO_PAGES}`
  throw new Error(
    `${at} holds no \`*${REPO_ENDING}\` page, so nothing says which repositories there are`
  )
}

let heldRepos: readonly string[] | null = null

export function repos(): readonly string[] {
  if (heldRepos === null) heldRepos = namedOnDisk()
  return heldRepos
}

export function addressableNamed(): string {
  return repos()
    .map((one) => `\`${one}\``)
    .join(", ")
}

export function isAddressable(value: string): value is Repo {
  return repos().includes(value)
}

export function isDirty(relPath: string): boolean {
  return relPath.split("/")[0] === QUARANTINE_ROOT
}

export function isVendored(relPath: string): boolean {
  return relPath.split("/")[0] === VENDOR_ROOT
}

export function rootBeside(repo: string): string {
  const here = akashaHere()
  if (repo === AKASHA) return here
  return resolve(here, "..", repo)
}

export function checkoutBeside(repo: string): string {
  const at = checkoutHere()
  if (repo === AKASHA) return at
  return resolve(at, "..", repo)
}

function rootOf(repo: string): string {
  const stated = process.env[rootEnvName(repo)]
  if (stated === undefined || stated === "") return rootBeside(repo)
  return resolve(stated)
}

export function akashaRoot(): string {
  return rootOf(AKASHA)
}

function clonedHere(): Roots {
  const at: Record<string, string> = {}
  for (const repo of repos()) {
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

export function resolveRoots(target: Repo = AKASHA): Roots {
  const at: Record<string, string> = {}
  for (const repo of repos()) {
    const root = rootOf(repo)
    if (existsSync(`${root}/.git`)) at[repo] = canonicalize(root)
  }
  return { ...at, target }
}

export function rootsNamed(at: Readonly<Record<string, string>>, target?: Repo): Roots {
  const asked = [...Object.keys(at), ...(target === undefined ? [] : [target])]
  const stray = [...new Set(asked)].filter((one) => !isAddressable(one))
  if (stray.length > 0) {
    const named = stray.map((one) => `\`${one}\``).join(", ")
    const name = stray.length === 1 ? "names" : "name"
    throw new Error(
      `${named} ${name} no repository here; the repositories are ${addressableNamed()}`
    )
  }
  const absent = Object.entries(at).filter(([, root]) => !existsSync(root))
  if (absent.length > 0) {
    const named = absent.map(([one, root]) => `\`${one}\` at \`${root}\``).join(", ")
    const name = absent.length === 1 ? "names a repository" : "name repositories"
    throw new Error(
      `${named} ${name} here, but nothing stands there; give the directory it is` +
        ` checked out in, or leave the key out to say it is not cloned here`
    )
  }
  return target === undefined ? { ...at } : { ...at, target }
}

export function targetRepo(roots: Roots): Repo {
  return roots.target ?? AKASHA
}

export function rootFor(roots: Roots, repo: string): string {
  const root = roots[repo]
  if (root === undefined) {
    throw new Error(
      `no \`${repo}\` repository is cloned here, so nothing says where its paths stand`
    )
  }
  return root
}

export function targetRoot(roots: Roots): string {
  return rootFor(roots, targetRepo(roots))
}

export interface Touched {
  readonly repo: string
  readonly relPath: string
}

export function locate(absolute: string, roots: Roots = rootsHere()): Touched | null {
  const at = canonicalize(absolute)
  for (const repo of repos()) {
    const root = roots[repo]
    if (root === undefined) continue
    const real = canonicalize(root)
    if (at === real) return { repo, relPath: "" }
    if (at.startsWith(`${real}/`)) return { repo, relPath: at.slice(real.length + 1) }
  }
  return null
}
