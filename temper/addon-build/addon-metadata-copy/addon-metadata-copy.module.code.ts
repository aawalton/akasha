import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import {
  DIST_UNDER,
  writeLoadOrder,
} from "akasha/temper/addon-build/addon-load-order/addon-load-order.module.code.ts"
import {
  addonBindingsPathIn,
  BINDINGS_FILE_NAME,
  GAME_METADATA_DIR,
  namedFilePathOrNull,
  namedFilePathsIn,
} from "akasha/temper/addon-build/addon-metadata-files/addon-metadata-files.module.code.ts"
import { ADDON_BUILD_REL_ROOT } from "akasha/temper/addon-build/modules/addon-compiler-config/addon-compiler-config.module.code.ts"
import { addonManifestSchema } from "akasha/temper/addons-resolve/addon-json/addon-json.module.code.ts"
import { addonManifestPathIn } from "akasha/temper/addons-resolve/addon-manifest-file/addon-manifest-file.module.code.ts"
import { OWNERSHIP_MARKER_FILE } from "akasha/temper/addons-resolve/folder-ownership/folder-ownership.module.code.ts"
import {
  readSiblingAddonNames,
  siblingDistDir,
  siblingManifestsIn,
  siblingSourceDir,
} from "akasha/temper/addons-resolve/sibling-addons/sibling-addons.module.code.ts"

const RUNTIME_TOKEN = /\$\([^)]*\)/

const MEANS_MORE = /[.*+?^${}()|[\]\\]/g

const SHIPPED_BY_MANIFEST = addonManifestSchema
  .pick({ additionalLuaFiles: true, assets: true, xmlFiles: true })
  .passthrough()

const NOT_A_FILE = /^\s*(?:#.*)?$/

const LOADED_BY_MANIFEST = /\.(?:lua|xml)$/i

export function listedIn(manifest: string): readonly string[] {
  return manifest
    .split("\n")
    .filter((one) => !NOT_A_FILE.test(one))
    .map((one) => one.trim())
}

function matcherFor(one: string): RegExp | null {
  if (!RUNTIME_TOKEN.test(one)) return null
  const parts = one.split(RUNTIME_TOKEN).map((part) => part.replace(MEANS_MORE, "\\$&"))
  return new RegExp(`^${parts.join("[^/]+")}$`)
}

export function unlistedIn(held: readonly string[], manifest: string): readonly string[] {
  const listed = listedIn(manifest)
  const named = new Set(listed)
  const filled = listed.flatMap((one) => {
    const matcher = matcherFor(one)
    return matcher === null ? [] : [matcher]
  })
  const loaded = (one: string): boolean =>
    named.has(one) || filled.some((matcher) => matcher.test(one))
  return held.filter((one) => LOADED_BY_MANIFEST.test(one) && !loaded(one)).sort()
}

function heldUnder(dir: string, under: string): readonly string[] {
  const out: string[] = []
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const at = under === "" ? entry.name : `${under}/${entry.name}`
    if (entry.isDirectory()) out.push(...heldUnder(join(dir, entry.name), at))
    else out.push(at)
  }
  return out
}

export type MetadataCopied = {
  readonly distDir: string
  readonly manifestPath: string
  readonly luaCount: number
  readonly namedFiles: number
  readonly metadataFolders: number
  readonly siblings: readonly string[]
}

export async function copyAddonMetadata(
  root: string,
  addonDir: string,
  canonicalName: string,
  done: string[] = []
): Promise<MetadataCopied> {
  const buildRoot = join(root, ADDON_BUILD_REL_ROOT)
  const distDir = join(buildRoot, DIST_UNDER, canonicalName)

  const order = await writeLoadOrder(root, addonDir, canonicalName, done)

  const namedMarkup = namedFilePathOrNull(root, addonDir, `${canonicalName}.xml`)
  if (namedMarkup !== null) {
    const markupAt = join(distDir, `${canonicalName}.xml`)
    writeFileSync(markupAt, readFileSync(namedMarkup, "utf-8"))
    done.push(`wrote ${markupAt}`)
  }

  const bindings = await addonBindingsPathIn(root, addonDir)
  if (bindings !== null) {
    const bindingsAt = join(distDir, BINDINGS_FILE_NAME)
    writeFileSync(bindingsAt, readFileSync(bindings, "utf-8"))
    done.push(`wrote ${bindingsAt}`)
  }

  const manifestPath = addonManifestPathIn(root, addonDir)
  if (manifestPath === null) {
    throw new Error(
      `copyAddonMetadata: ${addonDir} holds no addon manifest, so what the addon ships is unstated`
    )
  }
  const shipped = SHIPPED_BY_MANIFEST.parse(JSON.parse(readFileSync(manifestPath, "utf-8")))

  const luaPaths = namedFilePathsIn(root, addonDir, shipped.additionalLuaFiles ?? [])
  for (const [name, from] of luaPaths) {
    const luaAt = join(distDir, name)
    writeFileSync(luaAt, readFileSync(from, "utf-8"))
    done.push(`wrote ${luaAt}`)
  }

  const metadataDir = join(addonDir, GAME_METADATA_DIR)
  const folders = existsSync(metadataDir)
    ? readdirSync(metadataDir, { withFileTypes: true }).filter((one) => one.isDirectory())
    : []
  for (const one of folders) {
    const folderAt = join(distDir, one.name)
    cpSync(join(metadataDir, one.name), folderAt, { recursive: true })
    done.push(`copied ${folderAt}`)
  }

  const named = [
    ...(shipped.assets ?? []),
    ...(shipped.xmlFiles?.beforeBundle ?? []),
    ...(shipped.xmlFiles?.afterBundle ?? []),
  ].filter((one) => !RUNTIME_TOKEN.test(one))
  const namedPaths = namedFilePathsIn(root, addonDir, named)
  for (const [name, from] of namedPaths) {
    const to = join(distDir, name)
    mkdirSync(dirname(to), { recursive: true })
    cpSync(from, to)
    done.push(`copied ${to}`)
  }

  const siblingNames = readSiblingAddonNames(root, addonDir)
  const carried = siblingManifestsIn(root, addonDir)
  for (const name of siblingNames) {
    const from = siblingSourceDir(addonDir, name)
    const to = siblingDistDir(buildRoot, name)
    const stated = carried.get(name)
    if (existsSync(from)) {
      cpSync(from, to, { recursive: true })
      done.push(`copied ${to}`)
    } else if (stated !== undefined) {
      const carriedAt = join(to, `${name}.txt`)
      mkdirSync(to, { recursive: true })
      writeFileSync(carriedAt, stated)
      done.push(`wrote ${carriedAt}`)
    } else {
      throw new Error(
        `copyAddonMetadata: ${canonicalName} declares the sibling addon "${name}", and neither ${from} nor a manifest beside the page carries it`
      )
    }
    const markerAt = join(to, OWNERSHIP_MARKER_FILE)
    cpSync(join(distDir, OWNERSHIP_MARKER_FILE), markerAt)
    done.push(`copied ${markerAt}`)
  }

  const unlisted = unlistedIn(heldUnder(distDir, ""), readFileSync(order.manifestPath, "utf-8"))
  if (unlisted.length > 0) {
    throw new Error(
      `copyAddonMetadata: ${canonicalName} builds ${String(unlisted.length)} file(s) its manifest does not load, so the game ignores them: ${unlisted.join(", ")}`
    )
  }

  return {
    distDir,
    manifestPath: order.manifestPath,
    luaCount: order.luaCount,
    namedFiles: luaPaths.size + namedPaths.size,
    metadataFolders: folders.length,
    siblings: siblingNames,
  }
}
