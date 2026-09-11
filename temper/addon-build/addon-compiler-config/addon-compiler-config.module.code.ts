import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { valuesOfType } from "akasha/pages/indexes/reading/index-reading.module.code.ts"
import type { Value } from "akasha/pages/value-reading/page-value-reading.module.code.ts"
import { addonManifestPathIn } from "akasha/temper/addons-resolve/addon-manifest-file/addon-manifest-file.module.code.ts"

export const TSCONFIG_NAME = "tsconfig.json"

const ESO_ADDON_TYPE = "eso-addon"

const DECLARATION_TYPE = "type-declaration"

const CODE_SUFFIX = ".module.code.ts"

export const ADDON_BUILD_REL_ROOT = "temper/addon-build"

const ROOT_BASE_NAME = "tsconfig.base.json"

const HELD_AT = "dist/.lua-compiler"

const CODE_UNDER = `**/*${CODE_SUFFIX}`

const OWN_DECLARATIONS_UNDER = "**/*.d.ts"

const DECLARATIONS_UNDER = "**/*.type-declaration.d.ts"

const VERSION_MARK = /[<>=!]/

type AddonManifest = {
  readonly name?: string
  readonly dependsOn?: readonly string[]
  readonly optionalDependsOn?: readonly string[]
}

function addonManifestIn(root: string, dir: string): AddonManifest | null {
  const path = addonManifestPathIn(root, dir)
  if (path === null) return null
  try {
    return JSON.parse(readFileSync(path, "utf-8")) as AddonManifest
  } catch {
    return null
  }
}

function dependedOnIn(root: string, dir: string): readonly string[] {
  const said = addonManifestIn(root, dir)
  if (said === null) return []
  const named = [...(said.dependsOn ?? []), ...(said.optionalDependsOn ?? [])]
  return named.map((one) => (one.split(VERSION_MARK)[0] ?? "").trim()).filter((one) => one !== "")
}

type Reached = {
  readonly pageAt: ReadonlyMap<string, string>
  readonly valueAt: ReadonlyMap<string, Value>
  readonly namedAt: ReadonlyMap<string, string>
  readonly declaring: readonly string[]
}

const reachedHeld = new Map<string, Reached>()

function reachedIn(repoRoot: string): Reached {
  const held = reachedHeld.get(repoRoot)
  if (held !== undefined) return held
  const pageAt = new Map<string, string>()
  const valueAt = new Map<string, Value>()
  const namedAt = new Map<string, string>()
  const addonUnder = new Set<string>()
  const addonsUnder = new Set<string>()
  for (const one of valuesOfType(repoRoot, ESO_ADDON_TYPE)) {
    const folder = dirname(one.path)
    const dir = join(repoRoot, folder)
    if (pageAt.has(dir)) continue
    pageAt.set(dir, join(repoRoot, one.path))
    valueAt.set(dir, one.value)
    addonUnder.add(folder)
    addonsUnder.add(dirname(folder))
    const named = addonManifestIn(repoRoot, dir)?.name
    if (named !== undefined && !namedAt.has(named)) namedAt.set(named, dir)
  }
  const declaring = new Set<string>()
  for (const one of valuesOfType(repoRoot, DECLARATION_TYPE)) {
    for (const under of addonsUnder) {
      const head = `${under}/`
      if (!one.path.startsWith(head)) continue
      const named = one.path.slice(head.length).split("/")[0]
      if (named === undefined || named === "") continue
      const folder = `${under}/${named}`
      if (!addonUnder.has(folder)) declaring.add(join(repoRoot, folder))
    }
  }
  const made: Reached = { pageAt, valueAt, namedAt, declaring: [...declaring].sort() }
  reachedHeld.set(repoRoot, made)
  return made
}

function addonDirsByName(repoRoot: string): ReadonlyMap<string, string> {
  return reachedIn(repoRoot).namedAt
}

export function reachedAddonDirs(repoRoot: string, addonDir: string): readonly string[] {
  const byName = addonDirsByName(repoRoot)
  const found = new Set<string>()
  const asked = new Set<string>()
  const owed = [...dependedOnIn(repoRoot, addonDir)]
  for (;;) {
    const name = owed.pop()
    if (name === undefined) break
    if (asked.has(name)) continue
    asked.add(name)
    const dir = byName.get(name)
    if (dir === undefined || dir === addonDir) continue
    found.add(dir)
    owed.push(...dependedOnIn(repoRoot, dir))
  }
  return [...found].sort()
}

export function declaringDirs(repoRoot: string): readonly string[] {
  return reachedIn(repoRoot).declaring
}

export type EsoAddonPage = {
  readonly slug: string
  readonly bundleEntry: string | null
  readonly bindings: string | null
  readonly luaModules: readonly string[]
}

export function esoAddonPagePathIn(repoRoot: string, dir: string): string | null {
  return reachedIn(repoRoot).pageAt.get(dir) ?? null
}

export function readEsoAddonPage(repoRoot: string, dir: string): EsoAddonPage | null {
  const value = reachedIn(repoRoot).valueAt.get(dir)
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

export function slugBareOf(slug: string): string {
  const mark = slug.lastIndexOf("/")
  return mark === -1 ? slug : slug.slice(mark + 1)
}

export function bundleEntryPathIn(addonDir: string, entrySlug: string): string {
  const bare = slugBareOf(entrySlug)
  return join(addonDir, bare, `${bare}${CODE_SUFFIX}`)
}

export type CompilerConfigAsked = {
  readonly repoRoot: string
  readonly addonDir: string
  readonly canonicalName: string
  readonly entryPath: string
  readonly reachedDirs: readonly string[]
  readonly declaringDirs: readonly string[]
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
    include: [
      join(asked.addonDir, CODE_UNDER),
      join(asked.addonDir, OWN_DECLARATIONS_UNDER),
      ...asked.reachedDirs.map((one) => join(one, OWN_DECLARATIONS_UNDER)),
      ...asked.declaringDirs.map((one) => join(one, DECLARATIONS_UNDER)),
    ],
  }
  return `${JSON.stringify(body, null, 2)}\n`
}

export async function compilerConfigPathFor(
  repoRoot: string,
  addonDir: string,
  canonicalName: string
): Promise<string | null> {
  const beside = join(addonDir, TSCONFIG_NAME)
  if (existsSync(beside)) return beside
  const page = readEsoAddonPage(repoRoot, addonDir)
  if (page === null || page.bundleEntry === null) return null
  const entryPath = bundleEntryPathIn(addonDir, page.bundleEntry)
  if (!existsSync(entryPath)) {
    throw new Error(
      `compilerConfigPathFor: the page in ${addonDir} names "${page.bundleEntry}" as the bundle entry, and ${entryPath} is not there`
    )
  }
  const heldAt = join(repoRoot, ADDON_BUILD_REL_ROOT, HELD_AT)
  mkdirSync(heldAt, { recursive: true })
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
  return path
}
