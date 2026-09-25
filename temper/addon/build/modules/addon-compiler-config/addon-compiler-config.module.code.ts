import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import {
  valuedAt,
  valuesOfType,
} from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { addonManifestSchema } from "akasha/temper/addon/build/resolve/modules/addon-json/addon-json.module.code.ts"
import { addonManifestPathIn } from "akasha/temper/addon/build/resolve/modules/addon-manifest-file/addon-manifest-file.module.code.ts"
import type { z } from "zod"

export const TSCONFIG_NAME = "tsconfig.json"

const TEMPER_ADDON_TYPE = "temper-addon"

const DECLARATION_TYPE = "type-declaration"

const MODULE_TYPE = "module"

const CODE_SUFFIX = ".module.code.ts"

export const ADDON_BUILD_REL_ROOT = "temper/addon/build"

const TEMPER_HEAD = "temper/"

const ROOT_BASE_NAME = "tsconfig.base.json"

const HELD_AT = "dist/.lua-compiler"

const CODE_UNDER = `**/*${CODE_SUFFIX}`

const OWN_DECLARATIONS_UNDER = "**/*.d.ts"

const DECLARATIONS_UNDER = "**/*.type-declaration.d.ts"

const VERSION_MARK = /[<>=!]/

const MANIFEST_NAMING = addonManifestSchema
  .pick({ name: true, dependsOn: true, optionalDependsOn: true })
  .partial()

type AddonManifest = z.infer<typeof MANIFEST_NAMING>

type ManifestOf = (dir: string) => AddonManifest | null

export function manifestIn(text: string): AddonManifest | null {
  try {
    const parsed = MANIFEST_NAMING.safeParse(JSON.parse(text))
    return parsed.success ? parsed.data : null
  } catch {
    return null
  }
}

function addonManifestIn(root: string, dir: string): AddonManifest | null {
  const path = addonManifestPathIn(root, dir)
  if (path === null) return null
  try {
    return manifestIn(readFileSync(path, "utf-8"))
  } catch {
    return null
  }
}

function dependedOn(said: AddonManifest | null): readonly string[] {
  if (said === null) return []
  const named = [...(said.dependsOn ?? []), ...(said.optionalDependsOn ?? [])]
  return named.map((one) => (one.split(VERSION_MARK)[0] ?? "").trim()).filter((one) => one !== "")
}

type Reached = {
  readonly valueAt: ReadonlyMap<string, Value>
  readonly namedAt: ReadonlyMap<string, string>
  readonly declaring: readonly string[]
  readonly manifestOf: ManifestOf
}

type Addons = {
  readonly root: string
  readonly addons: readonly { readonly path: string; readonly value: Value }[]
  readonly declarations: readonly string[]
  readonly manifestOf: ManifestOf
}

const reachedHeld = new Map<string, Reached>()

function addonHolds(addonUnder: ReadonlySet<string>, folder: string): boolean {
  for (let at = folder; at !== "" && at !== "."; at = dirname(at)) {
    if (addonUnder.has(at)) return true
  }
  return false
}

export function reachedOver(given: Addons): Reached {
  const valueAt = new Map<string, Value>()
  const namedAt = new Map<string, string>()
  const addonUnder = new Set<string>()
  for (const one of given.addons) {
    const folder = dirname(one.path)
    const dir = join(given.root, folder)
    if (valueAt.has(dir)) continue
    valueAt.set(dir, one.value)
    addonUnder.add(folder)
    const named = given.manifestOf(dir)?.name
    if (named !== undefined && !namedAt.has(named)) namedAt.set(named, dir)
  }
  const declaring = new Set<string>()
  for (const path of given.declarations) {
    const folder = dirname(dirname(path))
    if (!folder.startsWith(TEMPER_HEAD)) continue
    if (addonHolds(addonUnder, folder)) continue
    declaring.add(join(given.root, folder))
  }
  return { valueAt, namedAt, declaring: [...declaring].sort(), manifestOf: given.manifestOf }
}

function reachedIn(repoRoot: string): Reached {
  const held = reachedHeld.get(repoRoot)
  if (held !== undefined) return held
  const made = reachedOver({
    root: repoRoot,
    addons: valuesOfType(repoRoot, TEMPER_ADDON_TYPE),
    declarations: valuesOfType(repoRoot, DECLARATION_TYPE).map((one) => one.path),
    manifestOf: (dir) => addonManifestIn(repoRoot, dir),
  })
  reachedHeld.set(repoRoot, made)
  return made
}

export function dirsReachedIn(reached: Reached, addonDir: string): readonly string[] {
  const found = new Set<string>()
  const asked = new Set<string>()
  const owed = [...dependedOn(reached.manifestOf(addonDir))]
  for (;;) {
    const name = owed.pop()
    if (name === undefined) break
    if (asked.has(name)) continue
    asked.add(name)
    const dir = reached.namedAt.get(name)
    if (dir === undefined || dir === addonDir) continue
    found.add(dir)
    owed.push(...dependedOn(reached.manifestOf(dir)))
  }
  return [...found].sort()
}

export function reachedAddonDirs(repoRoot: string, addonDir: string): readonly string[] {
  return dirsReachedIn(reachedIn(repoRoot), addonDir)
}

export function declaringDirs(repoRoot: string): readonly string[] {
  return reachedIn(repoRoot).declaring
}

export type TemperAddonPage = {
  readonly slug: string
  readonly bundleEntry: string | null
  readonly bindings: string | null
  readonly luaModules: readonly string[]
}

export function readTemperAddonPage(repoRoot: string, dir: string): TemperAddonPage | null {
  return addonPageOf(reachedIn(repoRoot).valueAt.get(dir))
}

export function addonPageOf(value: Value | undefined): TemperAddonPage | null {
  if (value === undefined) return null
  const slug = value.slug
  if (typeof slug !== "string") return null
  const entry = value.bundleEntry
  const bound = value.bindings
  const luaHeld = value.luaModules
  const luaSaid: readonly unknown[] = Array.isArray(luaHeld) ? luaHeld : []
  return {
    slug,
    bundleEntry: typeof entry === "string" ? entry : null,
    bindings: typeof bound === "string" ? bound : null,
    luaModules: luaSaid.filter((one) => typeof one === "string"),
  }
}

export function bareSlugOf(slug: string): string {
  const mark = slug.lastIndexOf("/")
  return mark === -1 ? slug : slug.slice(mark + 1)
}

export function entryCodeAt(modulePage: string, bare: string): string {
  return join(dirname(modulePage), `${bare}${CODE_SUFFIX}`)
}

export function bundleEntryPathIn(repoRoot: string, entrySlug: string): string {
  const bare = bareSlugOf(entrySlug)
  const page = valuedAt(repoRoot, MODULE_TYPE, bare)
  return join(repoRoot, entryCodeAt(page.path, bare))
}

export type CompilerConfigAsked = {
  readonly repoRoot: string
  readonly addonDir: string
  readonly canonicalName: string
  readonly entryPath: string
  readonly reachedDirs: readonly string[]
  readonly declaringDirs: readonly string[]
}

export function includedFor(
  addonDir: string,
  reachedDirs: readonly string[],
  declaringDirs: readonly string[]
): readonly string[] {
  return [
    join(addonDir, CODE_UNDER),
    join(addonDir, OWN_DECLARATIONS_UNDER),
    ...reachedDirs.map((one) => join(one, OWN_DECLARATIONS_UNDER)),
    ...declaringDirs.map((one) => join(one, DECLARATIONS_UNDER)),
  ]
}

export function compilerConfigBody(asked: CompilerConfigAsked): string {
  const buildRoot = join(asked.repoRoot, ADDON_BUILD_REL_ROOT)
  const body = {
    extends: join(asked.repoRoot, ROOT_BASE_NAME),
    compilerOptions: {
      module: "esnext",
      moduleResolution: "bundler",
      lib: ["ESNext"],
      jsx: "react",
      noEmit: true,
      isolatedModules: true,
      rootDir: asked.repoRoot,
      outDir: join(buildRoot, "dist", asked.canonicalName),
      target: "ESNext",
      strict: true,
      types: [],
    },
    luaCompiler: {
      noEmitLua: false,
      luaTarget: "5.1",
      luaBundle: `${asked.canonicalName}.lua`,
      luaBundleEntry: asked.entryPath,
      luaLibImport: "require-minimal",
      noResolvePaths: [],
      noImplicitSelf: true,
    },
    include: includedFor(asked.addonDir, asked.reachedDirs, asked.declaringDirs),
  }
  return `${JSON.stringify(body, null, 2)}\n`
}

export async function compilerConfigPathFor(
  repoRoot: string,
  addonDir: string,
  canonicalName: string,
  done: string[] = []
): Promise<string | null> {
  const beside = join(addonDir, TSCONFIG_NAME)
  if (existsSync(beside)) return beside
  const page = readTemperAddonPage(repoRoot, addonDir)
  if (page === null || page.bundleEntry === null) return null
  const entryPath = bundleEntryPathIn(repoRoot, page.bundleEntry)
  if (!existsSync(entryPath)) {
    throw new Error(
      `compilerConfigPathFor: the page in ${addonDir} names "${page.bundleEntry}" as the bundle entry, and ${entryPath} is not there`
    )
  }
  const heldAt = join(repoRoot, ADDON_BUILD_REL_ROOT, HELD_AT)
  const made = mkdirSync(heldAt, { recursive: true })
  if (made !== undefined) {
    done.push(`the folder ${made} was not there before this, and this made it`)
  }
  const path = join(heldAt, `${canonicalName}.${TSCONFIG_NAME}`)
  const reachedDirs = reachedAddonDirs(repoRoot, addonDir)
  writeFileSync(
    path,
    compilerConfigBody({
      repoRoot,
      addonDir,
      canonicalName,
      entryPath,
      reachedDirs,
      declaringDirs: declaringDirs(repoRoot),
    })
  )
  done.push(`wrote ${path}`)
  return path
}
