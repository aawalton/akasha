import { existsSync, readdirSync } from "node:fs"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"
import { canonicalize } from "../path/path.ts"
import type { Repo } from "../../page/document/types.ts"
import { pageNameOf } from "../../page/name/name.ts"
import type { Roots } from "../../page/page.ts"

export const AKASHA = "akasha"

/**
 * Where the checkout holding this file stands, worked out from this file and nothing else.
 *
 * NO VARIABLE REACHES THIS, WHICH IS THE POINT. `HERE` below prefers `AKASHA_ROOT`, and that is how
 * a caller points the roots at a fixture. This constant is what such a caller points away FROM, so
 * it is what tells a fixture root from the real one. Let a variable feed it and a write could state
 * its own innocence in the same breath as making itself.
 *
 * TWO RUNTIMES SPELL THIS FILE'S OWN PLACE DIFFERENTLY. `import.meta.dir` is bun's and reads
 * `undefined` under node, which is what the editor's extension host runs; `import.meta.dirname` is
 * node's and reads `undefined` under bun. `import.meta.url` is carried by both and is what answers
 * where neither name does.
 */
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

/**
 * Where this repository is on disk, for every root worked out from it.
 *
 * `AKASHA_ROOT` FIRST, then this file's own place. `rootOf` already prefers that variable for
 * every repository, this one included, so a caller that set it and a `HERE` that ignored it gave
 * two answers for one repository — and `HERE` won, silently, for the pages read at import.
 */
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

/**
 * Where one repository's real checkout stands, whatever any `*_ROOT` variable says.
 *
 * `rootBeside` ANSWERS WHERE A CALLER IS POINTED; THIS ANSWERS WHERE ALAN'S OWN COPY IS. They read
 * the same on a run that states no root, and apart on one that states a fixture — which is the only
 * case either is asked about.
 */
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
    // NAMED ONLY WHERE IT IS CLONED, which is the test `clonedHere` above already applies. A repo
    // page outlives the checkout it names — a consolidation takes the directory away long before
    // the page goes — and naming a root that is not on disk sent every reader of these roots to
    // `git -C` against a missing directory. That throws `cannot change to`, naming the directory
    // and not the repository, where every loop over these roots already skips one left out.
    if (existsSync(`${root}/.git`)) at[repo] = canonicalize(root)
  }
  return { ...at, target }
}

/**
 * Roots stated by hand, refusing a key that addresses nothing.
 *
 * TWO FAULTS, AND THEY WANT DIFFERENT FIXES, so they are refused apart. A key may name no
 * repository at all — `REPOS` is scanned from the repo pages at load, so which repositories exist
 * is data rather than a fact in this code, `Roots` is an open record because no closed type could
 * carry it, and a name a rename took away therefore type-checks. Or a key may name a real
 * repository at a path that is not on disk, which `isAddressable` says nothing about: it passes
 * every check until something walks it, and then throws from inside a scan about a file rather
 * than about the roots.
 *
 * Left to `rootFor`, the first fault surfaces as the repository that was asked for rather than the
 * key that was wrong. Built here, both are named where they were written.
 *
 * A repository this machine has not checked out is left out rather than pointed somewhere empty,
 * which is what `resolveRoots` above does already, and what every reader of `Roots` handles.
 *
 * The target names a repository rather than a root, as it does on `Roots` itself, and is judged
 * against the same set.
 */
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
