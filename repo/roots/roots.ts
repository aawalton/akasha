import { existsSync, readdirSync } from "node:fs"
import { resolve } from "node:path"
import { canonicalize } from "../path/path.ts"
import type { Repo } from "../../page/document/types.ts"
import { pageNameOf } from "../../page/name/name.ts"
import { pageFileIn } from "../../page/page-file.ts"
import type { Roots } from "../../page/page.ts"

export const AKASHA = "akasha"

export const BOOKS = "books"

export const CODE = "code"

export const INSTRUCTIONS = "instructions"

export const MEMORY = "memory"

/**
 * Where this repository is on disk, for every root worked out from it.
 *
 * `AKASHA_ROOT` FIRST, then this file's own place. `rootOf` already prefers that variable for
 * every repository, this one included, so a caller that set it and a `HERE` that ignored it gave
 * two answers for one repository — and `HERE` won, silently, for the pages read at import.
 *
 * A BUILD CARRYING NO `import.meta` HAS ONLY THE VARIABLE. Bundled to CommonJS, `import.meta`
 * compiles to `{}`, so this resolved `undefined` and threw `paths[0] must be of type string`
 * while the module was still loading — before any caller asked for anything, and fatally for
 * everything that imports it. The editor extension is such a build, and it names the root.
 */
function akashaHere(): string {
  const stated = process.env[rootEnvName(AKASHA)]
  if (stated !== undefined && stated !== "") return resolve(stated)
  const dir: string | undefined = import.meta.dir
  if (dir === undefined || dir === "") {
    throw new Error(
      `this build reads no \`import.meta\`, so nothing in it says where \`${AKASHA}\` is — a build like this names it in \`${rootEnvName(AKASHA)}\``
    )
  }
  return resolve(dir, "..", "..")
}

export const HERE = akashaHere()

export const QUARANTINE_ROOT = "dirty"

export const VENDOR_ROOT = "node_modules"

const REPO_PAGES = "pages/repo"

const REPO_ENDING = "-repo"

export function rootEnvName(repo: string): string {
  return `${repo.replaceAll("-", "_").toUpperCase()}_ROOT`
}

const BESIDE = resolve(HERE, "..", INSTRUCTIONS)

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

export function repoPagePath(repo: string): string {
  const stem = `${repo}${REPO_ENDING}`
  const root = rootOf(AKASHA)
  return `${root}/${pageFileIn(root, REPO_PAGES, stem) ?? `${REPO_PAGES}/${stem}.md`}`
}

export function rootBeside(repo: string): string {
  if (repo === INSTRUCTIONS) return BESIDE
  if (repo === AKASHA) return HERE
  return resolve(BESIDE, "..", repo)
}

function rootOf(repo: string): string {
  const stated = process.env[rootEnvName(repo)]
  return stated === undefined ? rootBeside(repo) : resolve(stated)
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
    // NAMED ONLY WHERE IT IS CLONED, which is the test `clonedHere` above already applies. A repo
    // page outlives the checkout it names — a consolidation takes the directory away long before
    // the page goes — and naming a root that is not on disk sent every reader of these roots to
    // `git -C` against a missing directory. That throws `cannot change to`, naming the directory
    // and not the repository, where every loop over these roots already skips one left out.
    if (existsSync(`${root}/.git`)) at[repo] = canonicalize(root)
  }
  return { ...at, target }
}

export function targetRepo(roots: Roots): Repo {
  return roots.target ?? AKASHA
}

/**
 * Where one repository stands in these roots, refusing to answer where it stands nowhere.
 *
 * A ROOT IS NAMED ONLY WHERE IT IS CLONED, so reading one straight off `Roots` hands back
 * `undefined` for every repository this machine has not checked out. Every such read used to
 * typecheck as `string` and then travel: a path built on it read `undefined/...`, a `git -C` ran
 * against nothing, a comparison against it matched nothing and reported "no" rather than "cannot
 * say". Go through here where the root must be there, and skip the repository where it need not.
 */
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
