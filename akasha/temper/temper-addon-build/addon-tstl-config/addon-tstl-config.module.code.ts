import { existsSync, mkdirSync, readdirSync, writeFileSync } from "node:fs"
import { join } from "node:path"

export const TSCONFIG_NAME = "tsconfig.json"

export const ESO_ADDON_PAGE_SUFFIX = ".eso-addon.ts"

const CODE_SUFFIX = ".module.code.ts"

const ADDONS_REL_ROOT = "temper/addons"

const HELD_AT = "dist/.tstl"

const CODE_UNDER = `**/*${CODE_SUFFIX}`

const GAME_TYPES_UNDER = "temper/addons/types/eso/**/*.d.ts"

export type EsoAddonPage = {
  readonly slug: string
  readonly bundleEntrySlug: string | null
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
    const said = value as { slug?: unknown; pageTypeSlug?: unknown; bundleEntrySlug?: unknown }
    if (said.pageTypeSlug !== "eso-addon" || typeof said.slug !== "string") continue
    const entry = said.bundleEntrySlug
    return { slug: said.slug, bundleEntrySlug: typeof entry === "string" ? entry : null }
  }
  return null
}

export function bundleEntryPathIn(addonDir: string, entrySlug: string): string {
  return join(addonDir, entrySlug, `${entrySlug}${CODE_SUFFIX}`)
}

export type TstlConfigAsked = {
  readonly repoRoot: string
  readonly addonDir: string
  readonly canonicalName: string
  readonly entryPath: string
}

export function tstlConfigBody(asked: TstlConfigAsked): string {
  const addonsRoot = join(asked.repoRoot, ADDONS_REL_ROOT)
  const body = {
    extends: join(addonsRoot, "tsconfig.base.json"),
    compilerOptions: {
      module: "esnext",
      moduleResolution: "bundler",
      isolatedModules: true,
      rewriteRelativeImportExtensions: true,
      rootDir: asked.repoRoot,
      outDir: join(addonsRoot, "dist", asked.canonicalName),
      target: "ESNext",
      strict: true,
      types: [],
    },
    tstl: {
      luaTarget: "5.1",
      luaBundle: `${asked.canonicalName}.lua`,
      luaBundleEntry: asked.entryPath,
      luaLibImport: "require-minimal",
      noImplicitSelf: true,
    },
    include: [join(asked.addonDir, CODE_UNDER), join(asked.repoRoot, GAME_TYPES_UNDER)],
  }
  return `${JSON.stringify(body, null, 2)}\n`
}

export async function tstlConfigPathFor(
  repoRoot: string,
  addonDir: string,
  canonicalName: string
): Promise<string | null> {
  const beside = join(addonDir, TSCONFIG_NAME)
  if (existsSync(beside)) return beside
  const page = await readEsoAddonPage(addonDir)
  if (page === null || page.bundleEntrySlug === null) return null
  const entryPath = bundleEntryPathIn(addonDir, page.bundleEntrySlug)
  if (!existsSync(entryPath)) return null
  const heldAt = join(repoRoot, ADDONS_REL_ROOT, HELD_AT)
  mkdirSync(heldAt, { recursive: true })
  const path = join(heldAt, `${canonicalName}.${TSCONFIG_NAME}`)
  writeFileSync(path, tstlConfigBody({ repoRoot, addonDir, canonicalName, entryPath }))
  return path
}
