import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs"
import { join, relative, sep } from "node:path"
import { ADDON_BUILD_REL_ROOT } from "akasha/temper/addon-build/addon-compiler-config/addon-compiler-config.module.code.ts"
import { addonManifestSchema } from "akasha/temper/addons-resolve/addon-json/addon-json.module.code.ts"
import { addonManifestPathIn } from "akasha/temper/addons-resolve/addon-manifest-file/addon-manifest-file.module.code.ts"
import { listAllAddons } from "akasha/temper/addons-resolve/addon-roster/addon-roster.module.code.ts"
import {
  type AddonDependencies,
  resolveDistributableSet,
} from "akasha/temper/addons-resolve/distributable-set/distributable-set.module.code.ts"
import {
  readSiblingAddonNames,
  siblingDistDir,
} from "akasha/temper/addons-resolve/sibling-addons/sibling-addons.module.code.ts"
import { saidBy as messageOf } from "akasha/utils/narrow/said-by/said-by.module.code.ts"
import { type Zippable, zipSync } from "fflate"

const DIST_UNDER = "dist"

export const ARCHIVE_NAME = "temper-addons.zip"

const ENTRY_MTIME = Date.UTC(2000, 0, 1)

const LEVEL = 9

const DEPENDS_SCHEMA = addonManifestSchema
  .pick({ dependsOn: true, optionalDependsOn: true })
  .passthrough()

export type Packed = {
  readonly archivePath: string | null
  readonly lines: readonly string[]
  readonly refusals: readonly string[]
}

function refusing(reason: string): Packed {
  return { archivePath: null, lines: [], refusals: [reason] }
}

function filesUnder(root: string): readonly string[] {
  const found: string[] = []
  for (const entry of readdirSync(root, { withFileTypes: true })) {
    const path = join(root, entry.name)
    if (entry.isDirectory()) found.push(...filesUnder(path))
    else if (entry.isFile()) found.push(path)
  }
  return [...found].sort()
}

function dependenciesOf(root: string, addonDir: string): AddonDependencies {
  const manifestPath = addonManifestPathIn(root, addonDir)
  if (manifestPath === null) throw new Error(`${addonDir} holds no addon manifest`)
  const parsed = DEPENDS_SCHEMA.safeParse(JSON.parse(readFileSync(manifestPath, "utf-8")))
  if (!parsed.success) {
    throw new Error(`${manifestPath} states no dependencies this reads — ${parsed.error.message}`)
  }
  return { dependsOn: parsed.data.dependsOn, optionalDependsOn: parsed.data.optionalDependsOn }
}

function packedInto(archive: Zippable, folderName: string, distDir: string): number {
  if (!existsSync(distDir)) throw new Error(`${folderName} has no build output at ${distDir}`)
  const files = filesUnder(distDir)
  if (files.length === 0) throw new Error(`${folderName} left ${distDir} empty`)
  for (const path of files) {
    const rel = relative(distDir, path).split(sep).join("/")
    archive[`${folderName}/${rel}`] = new Uint8Array(readFileSync(path))
  }
  return files.length
}

export function packedBundle(root: string, outDir: string): Packed {
  const buildRoot = join(root, ADDON_BUILD_REL_ROOT)
  const roster = listAllAddons({ repoRoot: root })
  if (roster.length === 0) {
    return refusing(
      `${root} holds no addon carrying a manifest, so a clean run here would pack an empty archive`
    )
  }

  let included: readonly string[]
  let external: readonly string[]
  try {
    const byName = new Map<string, AddonDependencies>(
      roster.map((one) => [one.canonicalName, dependenciesOf(root, one.dir)])
    )
    const set = resolveDistributableSet(byName)
    included = set.included
    external = set.external
  } catch (thrown) {
    return refusing(`the roster states no dependencies this reads: ${messageOf(thrown)}`)
  }

  const absent = included.filter((name) => {
    const distDir = join(buildRoot, DIST_UNDER, name)
    return !existsSync(distDir) || filesUnder(distDir).length === 0
  })
  if (absent.length > 0) {
    return refusing(
      `${String(absent.length)} of ${String(included.length)} addon(s) have no build output, and nothing here compiles one: ${absent.join(", ")}`
    )
  }

  const archive: Zippable = {}
  let packed = 0
  const dirByName = new Map(roster.map((one) => [one.canonicalName, one.dir]))
  try {
    for (const name of included) {
      packed += packedInto(archive, name, join(buildRoot, DIST_UNDER, name))
      const addonDir = dirByName.get(name)
      if (addonDir === undefined) continue
      for (const sibling of readSiblingAddonNames(root, addonDir)) {
        packed += packedInto(archive, sibling, siblingDistDir(buildRoot, sibling))
      }
    }
  } catch (thrown) {
    return refusing(`the archive was not packed whole: ${messageOf(thrown)}`)
  }

  const bytes = zipSync(archive, { level: LEVEL, mtime: ENTRY_MTIME })
  const archivePath = join(outDir, ARCHIVE_NAME)
  mkdirSync(outDir, { recursive: true })
  writeFileSync(archivePath, bytes)

  const notPacked =
    external.length === 0
      ? []
      : [
          `${String(external.length)} addon(s) the player installs themselves, packed by nothing here: ${external.join(", ")}`,
        ]

  return {
    archivePath,
    lines: [
      `packed ${String(included.length)} addon(s), ${String(packed)} file(s) into ${archivePath} (${String(bytes.length)} bytes)`,
      ...notPacked,
    ],
    refusals: [],
  }
}
