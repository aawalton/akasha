import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { addonManifestPathIn } from "akasha/temper/addons-resolve/addon-manifest-file/addon-manifest-file.module.code.ts"

export const TSCONFIG_NAME = "tsconfig.json"

export const ESO_ADDON_PAGE_SUFFIX = ".eso-addon.ts"

const CODE_SUFFIX = ".module.code.ts"

const ADDONS_REL_ROOT = "temper/addons"

const ROOT_BASE_NAME = "tsconfig.base.json"

const HELD_AT = "dist/.lua-compiler"

const CODE_UNDER = `**/*${CODE_SUFFIX}`

const OWN_DECLARATIONS_UNDER = "**/*.d.ts"

const DECLARATIONS_UNDER = "**/*.type-declaration.d.ts"

const DECLARATION_SUFFIX = ".type-declaration.d.ts"

const TEMPER_UNDER = "temper"

const LINKED_UNDER = "node_modules"

const VERSION_MARK = /[<>=!]/

type AddonManifest = {
  readonly name?: string
  readonly dependsOn?: readonly string[]
  readonly optionalDependsOn?: readonly string[]
}

function addonManifestIn(dir: string): AddonManifest | null {
  const path = addonManifestPathIn(dir)
  if (path === null) return null
  try {
    return JSON.parse(readFileSync(path, "utf-8")) as AddonManifest
  } catch {
    return null
  }
}

function dependedOnIn(dir: string): readonly string[] {
  const said = addonManifestIn(dir)
  if (said === null) return []
  const named = [...(said.dependsOn ?? []), ...(said.optionalDependsOn ?? [])]
  return named.map((one) => (one.split(VERSION_MARK)[0] ?? "").trim()).filter((one) => one !== "")
}

const addonDirsHeld = new Map<string, ReadonlyMap<string, string>>()

function addonDirsByName(repoRoot: string): ReadonlyMap<string, string> {
  const held = addonDirsHeld.get(repoRoot)
  if (held !== undefined) return held
  const found = new Map<string, string>()
  const under = join(repoRoot, TEMPER_UNDER)
  if (existsSync(under)) {
    for (const one of readdirSync(under, { withFileTypes: true })) {
      if (!one.isDirectory() || one.name.startsWith(".")) continue
      const dir = join(under, one.name)
      const named = addonManifestIn(dir)?.name
      if (named !== undefined) found.set(named, dir)
    }
  }
  addonDirsHeld.set(repoRoot, found)
  return found
}

export function reachedAddonDirs(repoRoot: string, addonDir: string): readonly string[] {
  const byName = addonDirsByName(repoRoot)
  const found = new Set<string>()
  const asked = new Set<string>()
  const owed = [...dependedOnIn(addonDir)]
  for (;;) {
    const name = owed.pop()
    if (name === undefined) break
    if (asked.has(name)) continue
    asked.add(name)
    const dir = byName.get(name)
    if (dir === undefined || dir === addonDir) continue
    found.add(dir)
    owed.push(...dependedOnIn(dir))
  }
  return [...found].sort()
}

function holdsDeclarations(dir: string): boolean {
  for (const one of readdirSync(dir, { withFileTypes: true })) {
    if (one.name === LINKED_UNDER) continue
    if (one.isDirectory()) {
      if (holdsDeclarations(join(dir, one.name))) return true
      continue
    }
    if (one.name.endsWith(DECLARATION_SUFFIX)) return true
  }
  return false
}

function addonFolder(dir: string): boolean {
  return readdirSync(dir).some((one) => one.endsWith(ESO_ADDON_PAGE_SUFFIX))
}

const declaringHeld = new Map<string, readonly string[]>()

export function declaringDirs(repoRoot: string): readonly string[] {
  const held = declaringHeld.get(repoRoot)
  if (held !== undefined) return held
  const under = join(repoRoot, TEMPER_UNDER)
  const found = existsSync(under)
    ? readdirSync(under, { withFileTypes: true })
        .filter((one) => one.isDirectory() && !one.name.startsWith("."))
        .map((one) => join(under, one.name))
        .filter((dir) => !addonFolder(dir) && holdsDeclarations(dir))
        .sort()
    : []
  declaringHeld.set(repoRoot, found)
  return found
}

export type EsoAddonPage = {
  readonly slug: string
  readonly bundleEntry: string | null
  readonly bindings: string | null
  readonly luaModules: readonly string[]
}

export function esoAddonPagePathIn(dir: string): string | null {
  let entries: readonly string[]
  try {
    entries = readdirSync(dir)
  } catch {
    return null
  }
  const named = entries.filter((one) => one.endsWith(ESO_ADDON_PAGE_SUFFIX)).sort()
  const first = named[0]
  return first === undefined ? null : join(dir, first)
}

export async function readEsoAddonPage(dir: string): Promise<EsoAddonPage | null> {
  const path = esoAddonPagePathIn(dir)
  if (path === null) return null
  const loaded = (await import(path)) as Record<string, unknown>
  for (const value of Object.values(loaded)) {
    if (typeof value !== "object" || value === null) continue
    const said = value as {
      slug?: unknown
      pageTypeSlug?: unknown
      bundleEntry?: unknown
      bindings?: unknown
      luaModules?: unknown
    }
    if (said.pageTypeSlug !== "eso-addon" || typeof said.slug !== "string") continue
    const entry = said.bundleEntry
    const bound = said.bindings
    const luaHeld = said.luaModules
    const luaSaid: readonly unknown[] = Array.isArray(luaHeld) ? luaHeld : []
    return {
      slug: said.slug,
      bundleEntry: typeof entry === "string" ? entry : null,
      bindings: typeof bound === "string" ? bound : null,
      luaModules: luaSaid.filter((one) => typeof one === "string"),
    }
  }
  return null
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
  const addonsRoot = join(asked.repoRoot, ADDONS_REL_ROOT)
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
      outDir: join(addonsRoot, "dist", asked.canonicalName),
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
  const page = await readEsoAddonPage(addonDir)
  if (page === null || page.bundleEntry === null) return null
  const entryPath = bundleEntryPathIn(addonDir, page.bundleEntry)
  if (!existsSync(entryPath)) {
    throw new Error(
      `compilerConfigPathFor: the page in ${addonDir} names "${page.bundleEntry}" as the bundle entry, and ${entryPath} is not there`
    )
  }
  const heldAt = join(repoRoot, ADDONS_REL_ROOT, HELD_AT)
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
