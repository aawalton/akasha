import { existsSync, readdirSync } from "node:fs"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"
import { canonicalize } from "../path/path.ts"
import type { Repo } from "../../page/document/types.ts"
import { pageNameOf } from "../../page/name/name.ts"
import type { Roots } from "../../page/page.ts"

export const AKASHA = "akasha"

function checkoutHere(): string {
  const meta: { readonly dir?: string; readonly dirname?: string; readonly url?: string } = import.meta
  const named = meta.dir ?? meta.dirname
  const dir = named ?? (meta.url === undefined ? undefined : dirname(fileURLToPath(meta.url)))
  if (dir === undefined || dir === "") {
    throw new Error(
      `nothing here says where this file is, so nothing says where \`${AKASHA}\` is — name it in \`${rootEnvName(AKASHA)}\``
    )
  }
  return resolve(dir, "..", "..")
}

export const CHECKOUT_HERE = checkoutHere()

function akashaHere(): string {
  const stated = process.env[rootEnvName(AKASHA)]
  if (stated !== undefined && stated !== "") return resolve(stated)
  return CHECKOUT_HERE
}

export const HERE = akashaHere()

export const QUARANTINE_ROOT = "dirty"

export const VENDOR_ROOT = "node_modules"

const REPO_PAGES = "pages/repo"

const REPO_ENDING = "-repo"

export function rootEnvName(repo: string): string {
  return `${repo.replaceAll("-", "_").toUpperCase()}_ROOT`
}

export function ownRepoRoot(): string {
  return rootOf(AKASHA)
}

function namedIn(at: string): readonly string[] {
  const found = new Set<string>()
  let entries: readonly string[]
  try {
    entries = readdirSync(at)
  } catch {
    return []
  }
  for (const one of entries) {
    const named = pageNameOf(one)
    if (named === null) continue
    if (!named.stem.endsWith(REPO_ENDING)) continue
    found.add(named.stem.slice(0, -REPO_ENDING.length))
  }
  return [...found].sort()
}

function namedOnDisk(): readonly string[] {
  const here = `${HERE}/${REPO_PAGES}`
  const own = namedIn(here)
  if (own.length > 0) return own
  throw new Error(
    `${here} holds no \`*${REPO_ENDING}\` page, so nothing says which repositories there are`
  )
}

export const REPOS = namedOnDisk()

export const ADDRESSABLE_NAMED = REPOS.map((one) => `\`${one}\``).join(", ")

export function isAddressable(value: string): value is Repo {
  return REPOS.includes(value)
}

export function isDirty(relPath: string): boolean {
  return relPath.split("/")[0] === QUARANTINE_ROOT
}

export function isVendored(relPath: string): boolean {
  return relPath.split("/")[0] === VENDOR_ROOT
}

export function rootBeside(repo: string): string {
  if (repo === AKASHA) return HERE
  return resolve(HERE, "..", repo)
}

export function checkoutBeside(repo: string): string {
  if (repo === AKASHA) return CHECKOUT_HERE
  return resolve(CHECKOUT_HERE, "..", repo)
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

export function resolveRoots(target: Repo = AKASHA): Roots {
  const at: Record<string, string> = {}
  for (const repo of REPOS) {
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
      `${named} ${name} no repository here; the repositories are ${ADDRESSABLE_NAMED}`
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
    throw new Error(`no \`${repo}\` repository is cloned here, so nothing says where its paths stand`)
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
  for (const repo of REPOS) {
    const root = roots[repo]
    if (root === undefined) continue
    const real = canonicalize(root)
    if (at === real) return { repo, relPath: "" }
    if (at.startsWith(`${real}/`)) return { repo, relPath: at.slice(real.length + 1) }
  }
  return null
}
