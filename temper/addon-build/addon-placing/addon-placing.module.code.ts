import { createHash } from "node:crypto"
import { cpSync, existsSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { join, relative } from "node:path"
import { CONSOLIDATION_MIGRATIONS } from "akasha/temper/addon-build/consolidation-migrations/consolidation-migrations.module.code.ts"
import { ADDON_BUILD_REL_ROOT } from "akasha/temper/addon-build/modules/addon-compiler-config/addon-compiler-config.module.code.ts"
import { listAllAddons } from "akasha/temper/addons-resolve/addon-roster/addon-roster.module.code.ts"
import {
  collectFloorsFor,
  decideFolderOwnership,
  decideInstallAction,
  foreignCopySatisfies,
  OWNERSHIP_MARKER_FILE,
} from "akasha/temper/addons-resolve/folder-ownership/folder-ownership.module.code.ts"
import { addonManifestSchema } from "akasha/temper/addons-resolve/modules/addon-json/addon-json.module.code.ts"
import { addonManifestPathIn } from "akasha/temper/addons-resolve/modules/addon-manifest-file/addon-manifest-file.module.code.ts"
import {
  readSiblingAddonNames,
  siblingDistDir,
} from "akasha/temper/addons-resolve/sibling-addons/sibling-addons.module.code.ts"
import { saidShort } from "akasha/temper/commands/flag-fault-stage/flag-fault-stage.module.code.ts"
import {
  addonsDir,
  savedVarsDir,
} from "akasha/temper/eso-paths/eso-paths-resolve/eso-paths-resolve.module.code.ts"
import {
  migrateBundleMemberSavedVars,
  readDeclaredSavedVars,
} from "akasha/temper/saved-vars-migration/bundle-member-saved-vars/bundle-member-saved-vars.module.code.ts"
import {
  appendAddonSavedVars,
  type ConsolidationMigration,
  migrateAddonSavedVars,
} from "akasha/temper/saved-vars-migration/saved-vars-migration/saved-vars-migration.module.code.ts"

const DIST = "dist"
const SHOWN = 10

const ADDON_VERSION_RE = /^##\s*AddOnVersion:\s*(\d+)\s*$/im
const PRESERVE_SCHEMA = addonManifestSchema.pick({ additionalLuaFiles: true }).passthrough()
const DEPS_SCHEMA = addonManifestSchema
  .pick({ dependsOn: true, optionalDependsOn: true })
  .partial()
  .passthrough()

export type Placed = {
  readonly lines: readonly string[]
  readonly refusals: readonly string[]
}

type OnePlaced = Placed & { readonly skipped: boolean }

function filesUnder(root: string): readonly string[] {
  const out: string[] = []
  for (const entry of readdirSync(root, { withFileTypes: true })) {
    const full = join(root, entry.name)
    if (entry.isDirectory()) out.push(...filesUnder(full))
    else out.push(full)
  }
  return out
}

function digestOf(path: string): { readonly hash: string; readonly size: number } | null {
  try {
    const body = readFileSync(path)
    return { hash: createHash("sha256").update(body).digest("hex"), size: body.byteLength }
  } catch {
    return null
  }
}

function saidOfDigest(digest: { readonly hash: string; readonly size: number } | null): string {
  return digest === null ? "UNREADABLE" : `${digest.hash.slice(0, 16)}:${String(digest.size)}`
}

function markerThere(dir: string): boolean | undefined {
  try {
    readdirSync(dir)
  } catch {
    return undefined
  }
  return existsSync(join(dir, OWNERSHIP_MARKER_FILE))
}

function versionIn(dir: string, name: string): number | undefined {
  for (const extension of [".txt", ".addon"]) {
    const path = join(dir, `${name}${extension}`)
    if (!existsSync(path)) continue
    try {
      const found = ADDON_VERSION_RE.exec(readFileSync(path, "utf-8"))
      const captured = found?.[1]
      if (captured === undefined) continue
      return Number.parseInt(captured, 10)
    } catch {}
  }
  return undefined
}

function saidOfForeign(version: number | undefined, asked: readonly number[]): string {
  const found =
    version === undefined
      ? "its version is unreadable"
      : `it declares AddOnVersion ${String(version)}`
  if (asked.length === 0) return `${found}, and this fleet asks nothing of it`
  return `${found}, and the most this fleet asks of it is >=${String(Math.max(...asked))}`
}

function carriedAcross(root: string, addonDir: string): readonly string[] {
  const path = addonManifestPathIn(root, addonDir)
  if (path === null) return []
  try {
    const raw: unknown = JSON.parse(readFileSync(path, "utf-8"))
    const parsed = PRESERVE_SCHEMA.safeParse(raw)
    return parsed.success ? (parsed.data.additionalLuaFiles ?? []) : []
  } catch {
    return []
  }
}

function fleetDependencyLists(root: string): readonly (readonly string[])[] {
  const lists: (readonly string[])[] = []
  for (const addon of listAllAddons({ repoRoot: root })) {
    const path = addonManifestPathIn(root, addon.dir)
    if (path === null) continue
    try {
      const raw: unknown = JSON.parse(readFileSync(path, "utf-8"))
      const parsed = DEPS_SCHEMA.safeParse(raw)
      if (!parsed.success) continue
      lists.push([...(parsed.data.dependsOn ?? []), ...(parsed.data.optionalDependsOn ?? [])])
    } catch {}
  }
  return lists
}

function partedFrom(source: string, target: string, kept: ReadonlySet<string>): readonly string[] {
  const parted: string[] = []
  for (const from of filesUnder(source)) {
    const rel = relative(source, from)
    if (kept.has(rel)) continue
    const to = join(target, rel)
    const there = digestOf(from)
    if (!existsSync(to)) {
      parted.push(`${rel}: built ${saidOfDigest(there)} installed MISSING`)
      continue
    }
    const here = digestOf(to)
    if (there === null || here === null || here.hash !== there.hash) {
      parted.push(`${rel}: built ${saidOfDigest(there)} installed ${saidOfDigest(here)}`)
    }
  }
  return parted
}

function placed(
  esoAddons: string,
  root: string,
  folder: string,
  source: string,
  keepNames: readonly string[]
): OnePlaced {
  const target = join(esoAddons, folder)
  const kept = new Map<string, Buffer>()
  for (const name of keepNames) {
    const live = join(target, name)
    if (existsSync(live)) kept.set(name, readFileSync(live))
  }

  const ownership = decideFolderOwnership({
    dirExists: existsSync(target),
    markerPresent: markerThere(target),
  })
  const version = ownership === "foreign" ? versionIn(target, folder) : undefined
  const asked = ownership === "foreign" ? collectFloorsFor(folder, fleetDependencyLists(root)) : []
  const decision = decideInstallAction(
    ownership,
    folder,
    ownership === "foreign" ? foreignCopySatisfies(version, asked) : undefined,
    saidOfForeign(version, asked)
  )
  if (decision.action === "refuse") {
    return { lines: [], refusals: [`${folder}: ${decision.reason}`], skipped: false }
  }
  if (decision.action === "skip") {
    return { lines: [`${folder}: ${decision.reason}`], refusals: [], skipped: true }
  }

  try {
    rmSync(target, { recursive: true, force: true })
    cpSync(source, target, { recursive: true })
    for (const [name, body] of kept) writeFileSync(join(target, name), body)
  } catch (thrown) {
    return {
      lines: [],
      refusals: [`${folder}: replacing ${target} from ${source} broke off — ${saidShort(thrown)}`],
      skipped: false,
    }
  }

  const parted = partedFrom(source, target, new Set(kept.keys()))
  const count = filesUnder(source).length
  if (parted.length > 0) {
    return {
      lines: [],
      refusals: [
        `${folder}: what is installed does not match what was built, in ${String(parted.length)} of ${String(count)} file(s):`,
        ...parted.slice(0, SHOWN).map((one) => `  ${one}`),
        "The compiler or the metadata copy answered zero over stale or missing output, or the copy did not finish.",
      ],
      skipped: false,
    }
  }
  const also = kept.size > 0 ? `, ${String(kept.size)} host file(s) carried across` : ""
  return {
    lines: [
      `installed ${folder} to ${target} — ${String(count)} file(s) verified by sha256${also}`,
    ],
    refusals: [],
    skipped: false,
  }
}

function migratedIn(canonicalName: string, sourceDir: string, vars: string): readonly string[] {
  const lines: string[] = []
  const bundle = migrateBundleMemberSavedVars(canonicalName, readDeclaredSavedVars(sourceDir), {
    savedVarsDir: vars,
    nowIso: new Date().toISOString(),
  })
  if (bundle.kind === "migrated") {
    const aside = bundle.backedUp ? "; prior file copied aside" : ""
    lines.push(
      `migrated saved variables out of the bundle into ${bundle.member}.lua (${String(bundle.globals.length)} global(s), ${String(bundle.bytesWritten)} bytes${aside})`
    )
  }
  for (const migration of CONSOLIDATION_MIGRATIONS as readonly ConsolidationMigration[]) {
    if (migration.runFor !== canonicalName) continue
    if (migration.mode === "rename") {
      const outcome = migrateAddonSavedVars(
        migration.oldFileBase,
        migration.newFileBase,
        migration.renames,
        { savedVarsDir: vars }
      )
      if (outcome.kind === "renamed") {
        lines.push(
          `migrated saved variables: ${outcome.from}.lua to ${outcome.to}.lua (${String(outcome.renamedCount)} global(s) renamed)`
        )
      }
      continue
    }
    const outcome = appendAddonSavedVars(migration.spec, { savedVarsDir: vars })
    if (outcome.kind === "appended") {
      lines.push(
        `appended saved variables: ${outcome.absorbed}.lua to ${outcome.target}.lua (top-level global)`
      )
    }
  }
  return lines
}

export function placedAddon(root: string, sourceDir: string, canonicalName: string): Placed {
  const buildRoot = join(root, ADDON_BUILD_REL_ROOT)
  const built = join(buildRoot, DIST, canonicalName)
  if (!existsSync(built)) {
    return { lines: [], refusals: [`${canonicalName} has no build at ${built}`] }
  }

  let esoAddons: string
  try {
    esoAddons = addonsDir()
  } catch (thrown) {
    return {
      lines: [],
      refusals: [
        `${canonicalName} goes into the game's addons folder, and no live directory was found — ${saidShort(thrown)}`,
      ],
    }
  }

  const report: string[] = []
  const main = placed(esoAddons, root, canonicalName, built, carriedAcross(root, sourceDir))
  report.push(...main.lines)
  if (main.refusals.length > 0) return { lines: report, refusals: main.refusals }
  if (main.skipped) return { lines: report, refusals: [] }

  for (const sibling of readSiblingAddonNames(root, sourceDir)) {
    const siblingBuilt = siblingDistDir(buildRoot, sibling)
    if (!existsSync(siblingBuilt)) {
      return {
        lines: report,
        refusals: [
          `${sibling} has no build at ${siblingBuilt}, and ${canonicalName} declares it as a sibling addon`,
        ],
      }
    }
    const beside = placed(esoAddons, root, sibling, siblingBuilt, [])
    report.push(...beside.lines)
    if (beside.refusals.length > 0) return { lines: report, refusals: beside.refusals }
  }

  report.push(...migratedIn(canonicalName, sourceDir, savedVarsDir()))
  return { lines: report, refusals: [] }
}
