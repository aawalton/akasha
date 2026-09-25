import { basename, dirname, join } from "node:path"
import { matching } from "akasha/code/lua-runtime-library/modules/config-claiming/config-claiming.module.code.ts"
import { compiled } from "akasha/code/reading/modules/code-typing/code-typing.module.code.ts"
import { closureOf } from "akasha/graph/predicate/modules/closure/graph-predicate-closure.module.code.ts"
import { imports } from "akasha/graph/predicate/pages/imports/imports.graph-predicate.ts"
import type { Answering } from "akasha/page/index/modules/answering/index-answering.module.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import {
  addonPageOf,
  bareSlugOf,
  compilerConfigBody,
  dirsReachedIn,
  entryCodeAt,
  includedFor,
  manifestIn,
  reachedOver,
} from "akasha/temper/addon/build/modules/addon-compiler-config/addon-compiler-config.module.code.ts"
import { manifestBeside } from "akasha/temper/addon/build/resolve/modules/addon-manifest-file/addon-manifest-file.module.code.ts"

const ADDON = "temper-addon"

const DECLARATION = "type-declaration"

const MODULE = "module"

const TOP = ""

export const BASE = "tsconfig.base.json"

type Reader = (path: string) => string | null

export type Tree = {
  readonly index: Answering
  readonly listed: () => readonly string[]
  readonly read: Reader
}

export type Addon = {
  readonly page: string
  readonly folder: string
  readonly name: string
  readonly manifest: string
  readonly entrySlug: string | null
  readonly entry: string | null
  readonly reached: readonly string[]
  readonly declaring: readonly string[]
}

type Paged = {
  readonly page: string
  readonly manifest: string | null
}

function entryIn(index: Answering, slug: string): string | null {
  const bare = bareSlugOf(slug)
  const listed = index.listedAt(MODULE, bare)[0]
  return listed === undefined ? null : entryCodeAt(listed.path, bare)
}

function pagedIn(values: ReadonlyMap<string, Value>, read: Reader): ReadonlyMap<string, Paged> {
  const found = new Map<string, Paged>()
  for (const [page, value] of values) {
    const folder = dirname(page)
    if (found.has(folder)) continue
    found.set(folder, { page, manifest: manifestBeside(page, value, (at) => read(at) !== null) })
  }
  return found
}

export function addonsIn(tree: Tree): readonly Addon[] {
  const values = tree.index.valuesByPath(ADDON)
  const paged = pagedIn(values, tree.read)
  const manifestOf = (folder: string): ReturnType<typeof manifestIn> => {
    const at = paged.get(folder)?.manifest ?? null
    const text = at === null ? null : tree.read(at)
    return text === null ? null : manifestIn(text)
  }
  const reached = reachedOver({
    root: TOP,
    addons: [...values].map(([path, value]) => ({ path, value })),
    declarations: tree.index.everyOfType(DECLARATION).map((one) => one.path),
    manifestOf,
  })
  const found: Addon[] = []
  for (const [folder, value] of reached.valueAt) {
    const said = manifestOf(folder)
    const held = paged.get(folder)
    if (said === null || held === undefined || held.manifest === null) continue
    const entrySlug = addonPageOf(value)?.bundleEntry ?? null
    found.push({
      page: held.page,
      folder,
      name: said.name ?? basename(folder),
      manifest: held.manifest,
      entrySlug,
      entry: entrySlug === null ? null : entryIn(tree.index, entrySlug),
      reached: dirsReachedIn(reached, folder),
      declaring: reached.declaring,
    })
  }
  return found.sort((one, two) => one.name.localeCompare(two.name))
}

function claimsOf(one: Addon): readonly RegExp[] {
  return includedFor(one.folder, one.reached, one.declaring).map(matching)
}

function ownOf(one: Addon): ReadonlySet<string> {
  const own = new Set([one.page, one.manifest, BASE])
  if (one.entry !== null) own.add(one.entry)
  return own
}

export function reachedAmong(addons: readonly Addon[], paths: readonly string[]): readonly Addon[] {
  return addons.filter((one) => {
    const claims = claimsOf(one)
    const own = ownOf(one)
    return paths.some((at) => own.has(at) || claims.some((each) => each.test(at)))
  })
}

export function programOf(one: Addon, tree: Tree): readonly string[] {
  const claims = claimsOf(one)
  const roots = [one.folder, ...one.reached, ...one.declaring].map((at) => `${at}/`)
  const seeds = tree
    .listed()
    .filter(
      (at) => roots.some((root) => at.startsWith(root)) && claims.some((each) => each.test(at))
    )
  if (one.entry !== null) seeds.push(one.entry)
  return closureOf(imports, seeds, {
    index: tree.index,
    bodyAt: tree.read,
    through: (at) => compiled(at) && tree.read(at) !== null,
  })
}

export function settingsOf(root: string, one: Addon, entry: string): string {
  return compilerConfigBody({
    repoRoot: root,
    addonDir: join(root, one.folder),
    canonicalName: one.name,
    entryPath: join(root, entry),
    reachedDirs: one.reached.map((at) => join(root, at)),
    declaringDirs: one.declaring.map((at) => join(root, at)),
  })
}
