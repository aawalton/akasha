import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { valuesOfType } from "@akasha/indexes"
import { numberAt, textAt } from "@akasha/pages-system/page-value"
import type { AddonManifest } from "@akasha/temper-addons-resolve/addon-json"
import { addonManifestSchema } from "@akasha/temper-addons-resolve/addon-json"
import { addonManifestPathIn } from "@akasha/temper-addons-resolve/addon-manifest-file"
import { ran } from "@akasha/utils-run/running"
import {
  TSCONFIG_NAME,
  tstlConfigPathFor,
} from "../addon-tstl-config/addon-tstl-config.module.code.ts"

export const BUILD_ID_FILE = "build-id.lua"

export const ADDONS_REL_ROOT = "temper/addons"

export const DIST_UNDER = "dist"

const TSTL_UNDER = "dist/.tstl"

export const CATALOG_ADDON_NAME = "TemperCatalog"

const GAME_METADATA_DIR = "metadata"

const AT_LEAST = ">="

const ONLY_DIGITS = /^\d+$/

const LEADING_ZEROS = /^0+(?=\d)/

const NOT_HEX = /[^0-9a-f]/g

const SHORT_SHA = 8

const UNKNOWN_SHA = "unknown"

const SAID_BY_CI = "CI_COMMIT_SHA"

function luaBundleAt(tsconfigPath: string): string | null {
  try {
    const said = JSON.parse(readFileSync(tsconfigPath, "utf-8")) as {
      tstl?: { luaBundle?: unknown }
    }
    const found = said.tstl?.luaBundle
    return typeof found === "string" ? found : null
  } catch {
    return null
  }
}

export function readTstlLuaBundle(dir: string, ...alsoAt: readonly string[]): string | null {
  for (const path of [join(dir, TSCONFIG_NAME), ...alsoAt]) {
    const found = luaBundleAt(path)
    if (found !== null) return found
  }
  return null
}

export async function loadAddonConfig(addonDir: string): Promise<AddonManifest | null> {
  const path = addonManifestPathIn(addonDir)
  if (path === null) return null
  try {
    return addonManifestSchema.parse(JSON.parse(readFileSync(path, "utf-8")))
  } catch {
    return null
  }
}

export async function readAdditionalLuaFiles(addonDir: string): Promise<readonly string[]> {
  return (await loadAddonConfig(addonDir))?.additionalLuaFiles ?? []
}

export async function readXmlFiles(addonDir: string): Promise<{
  readonly beforeBundle: readonly string[]
  readonly afterBundle: readonly string[]
}> {
  const config = await loadAddonConfig(addonDir)
  return {
    beforeBundle: config?.xmlFiles?.beforeBundle ?? [],
    afterBundle: config?.xmlFiles?.afterBundle ?? [],
  }
}

export function normalizeDependency(dep: string): string {
  const at = dep.indexOf(AT_LEAST)
  if (at === -1) return dep
  const name = dep.slice(0, at)
  const version = dep.slice(at + AT_LEAST.length)
  if (!ONLY_DIGITS.test(version)) return dep
  const stripped = version.replace(LEADING_ZEROS, "")
  return stripped === "0" ? name : `${name}${AT_LEAST}${stripped}`
}

export type ManifestAsked = {
  readonly metadataHeader: string
  readonly buildIdFile?: string
  readonly additionalLuaFiles: readonly string[]
  readonly xmlBeforeBundle?: readonly string[]
  readonly xmlAfterBundle?: readonly string[]
  readonly luaPaths: readonly string[]
  readonly addonName: string
  readonly nameXmlThere: boolean
  readonly bindingsXmlThere: boolean
}

export function manifestLines(asked: ManifestAsked): readonly string[] {
  const lines: string[] = [
    asked.metadataHeader,
    "",
    ...(asked.buildIdFile === undefined ? [] : [asked.buildIdFile]),
    ...asked.additionalLuaFiles,
    ...(asked.xmlBeforeBundle ?? []),
    ...asked.luaPaths,
    ...(asked.xmlAfterBundle ?? []),
  ]
  if (asked.nameXmlThere) lines.push(`${asked.addonName}.xml`)
  if (asked.bindingsXmlThere) lines.push("Bindings.xml")
  return lines
}

export function nameXmlThereIn(addonDir: string, addonName: string): boolean {
  return existsSync(join(addonDir, GAME_METADATA_DIR, `${addonName}.xml`))
}

export function bindingsXmlThereIn(addonDir: string): boolean {
  return existsSync(join(addonDir, GAME_METADATA_DIR, "Bindings.xml"))
}

const CATALOG_PAGE_TYPE = "temper-catalog-domain"

const LEFT_ALONE = "dormant"

const RAN_FOR = "generatorRanForManifestApiVersion"

function leftAlone(value: Record<string, unknown>): boolean {
  const said = value[LEFT_ALONE]
  return said === true || said === "true"
}

export function catalogApiVersion(root: string): string {
  const every = valuesOfType(root, CATALOG_PAGE_TYPE)
  const working = every.filter((one) => !leftAlone(one.value))
  if (working.length === 0) {
    throw new Error(
      `catalogApiVersion: no ${CATALOG_PAGE_TYPE} page the index holds is being collected, and the lowest of nothing is no version`
    )
  }
  const versions: number[] = []
  const silent: string[] = []
  for (const one of working) {
    const said = numberAt(one.value, RAN_FOR)
    if (said === undefined || said === null) silent.push(textAt(one.value, "slug") ?? one.path)
    else versions.push(said)
  }
  if (silent.length > 0) {
    throw new Error(
      `catalogApiVersion: ${String(silent.length)} ${CATALOG_PAGE_TYPE} page(s) being collected state no ${RAN_FOR}: ${silent.join(", ")}`
    )
  }
  return String(Math.min(...versions))
}

export async function metadataHeader(
  addonName: string,
  addonDir: string,
  forCatalog: () => string
): Promise<string> {
  const config = await loadAddonConfig(addonDir)
  if (config === null) throw new Error(`metadataHeader: no addon manifest found for ${addonName}`)

  let apiVersionLine: string
  if (addonName === CATALOG_ADDON_NAME) {
    apiVersionLine = `## APIVersion: ${forCatalog()}`
  } else {
    if (config.apiVersion === undefined || config.apiVersion.length === 0) {
      throw new Error(
        `metadataHeader: the manifest for ${addonName} declares no non-empty 'apiVersion' array`
      )
    }
    apiVersionLine = `## APIVersion: ${config.apiVersion.join(" ")}`
  }

  const lines = [
    `## Title: ${config.title}`,
    `## Description: ${config.description}`,
    `## Author: ${config.author}`,
    `## Version: ${config.version}`,
    `## AddOnVersion: ${String(config.addonVersion)}`,
    apiVersionLine,
  ]
  if (config.savedVariables.length > 0) {
    lines.push(`## SavedVariables: ${config.savedVariables.join(" ")}`)
  }
  if (config.dependsOn.length > 0) {
    lines.push(`## DependsOn: ${config.dependsOn.map(normalizeDependency).join(" ")}`)
  }
  if (config.optionalDependsOn !== undefined && config.optionalDependsOn.length > 0) {
    lines.push(
      `## OptionalDependsOn: ${config.optionalDependsOn.map(normalizeDependency).join(" ")}`
    )
  }
  return lines.join("\n")
}

export function buildIdFor(cwd: string): string {
  const fromCi = process.env[SAID_BY_CI]
  const raw =
    fromCi !== undefined && fromCi.length > 0
      ? fromCi
      : ran(["git", "rev-parse", "HEAD"], { cwd }).out.trim()
  const hex = raw.toLowerCase().replace(NOT_HEX, "")
  return hex.length >= SHORT_SHA ? hex.slice(0, SHORT_SHA) : UNKNOWN_SHA
}

export function buildIdLua(addonName: string, sha: string): string {
  return `TemperBuildIds = TemperBuildIds or {}\nTemperBuildIds["${addonName}"] = "${sha}"\n`
}

export type LoadOrderWritten = {
  readonly manifestPath: string
  readonly buildIdPath: string
  readonly luaCount: number
  readonly bytes: number
}

export async function writeLoadOrder(
  root: string,
  addonDir: string,
  canonicalName: string
): Promise<LoadOrderWritten> {
  const distDir = join(root, ADDONS_REL_ROOT, DIST_UNDER, canonicalName)
  await tstlConfigPathFor(root, addonDir, canonicalName)
  const generated = join(root, ADDONS_REL_ROOT, TSTL_UNDER, `${canonicalName}.${TSCONFIG_NAME}`)
  const bundle = readTstlLuaBundle(addonDir, generated)
  if (bundle === null) {
    throw new Error(
      `writeLoadOrder: neither ${join(addonDir, TSCONFIG_NAME)} nor ${generated} declares a tstl.luaBundle, and the manifest has to name the Lua the game loads`
    )
  }
  const additionalLuaFiles = await readAdditionalLuaFiles(addonDir)
  const xml = await readXmlFiles(addonDir)
  const lines = manifestLines({
    metadataHeader: await metadataHeader(canonicalName, addonDir, () => catalogApiVersion(root)),
    buildIdFile: BUILD_ID_FILE,
    additionalLuaFiles,
    xmlBeforeBundle: xml.beforeBundle,
    xmlAfterBundle: xml.afterBundle,
    luaPaths: [bundle.split("/").pop() ?? bundle],
    addonName: canonicalName,
    nameXmlThere: nameXmlThereIn(addonDir, canonicalName),
    bindingsXmlThere: bindingsXmlThereIn(addonDir),
  })
  const body = `${lines.join("\n")}\n`
  const manifestPath = join(distDir, `${canonicalName}.txt`)
  const buildIdPath = join(distDir, BUILD_ID_FILE)
  mkdirSync(distDir, { recursive: true })
  writeFileSync(buildIdPath, buildIdLua(canonicalName, buildIdFor(addonDir)))
  writeFileSync(manifestPath, body)
  return {
    manifestPath,
    buildIdPath,
    luaCount: 1 + additionalLuaFiles.length,
    bytes: Buffer.byteLength(body),
  }
}
