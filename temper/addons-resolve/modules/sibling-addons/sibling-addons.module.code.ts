import { readFileSync } from "node:fs"
import { join } from "node:path"
import { addonManifestSchema } from "akasha/temper/addons-resolve/modules/addon-json/addon-json.module.code.ts"
import {
  addonFilePathIn,
  addonManifestPathIn,
} from "akasha/temper/addons-resolve/modules/addon-manifest-file/addon-manifest-file.module.code.ts"
import { z } from "zod"

const SIBLING_ADDONS_DIR = "siblings"

const SIBLING_MANIFEST = "sibling-manifest"

const siblingNamesSchema = addonManifestSchema.pick({ siblingAddons: true }).partial().passthrough()

const siblingManifestSchema = z.record(z.string(), z.string())

const SAFE_FOLDER_NAME = /^[A-Za-z0-9][A-Za-z0-9._-]*$/

export function safeFolderName(name: string): boolean {
  return SAFE_FOLDER_NAME.test(name) && name !== "." && name !== ".."
}

export function assertSafeSiblingName(name: string): undefined {
  if (!safeFolderName(name)) {
    throw new Error(
      `siblingAddons: ${JSON.stringify(name)} is no usable addon folder name — a sibling name becomes a path that is removed and made again, so it has to be a bare folder name matching /^[A-Za-z0-9][A-Za-z0-9._-]*$/`
    )
  }
  return undefined
}

export function readSiblingAddonNames(root: string, addonDir: string): readonly string[] {
  const path = addonManifestPathIn(root, addonDir)
  if (path === null) return []
  let raw: unknown
  try {
    raw = JSON.parse(readFileSync(path, "utf-8"))
  } catch {
    return []
  }
  const parsed = siblingNamesSchema.safeParse(raw)
  if (!parsed.success) return []
  const names = parsed.data.siblingAddons ?? []
  for (const name of names) assertSafeSiblingName(name)
  return names
}

export function siblingManifestsIn(root: string, addonDir: string): ReadonlyMap<string, string> {
  const found = new Map<string, string>()
  const path = addonFilePathIn(root, addonDir, SIBLING_MANIFEST)
  if (path === null) return found
  let raw: unknown
  try {
    raw = JSON.parse(readFileSync(path, "utf-8"))
  } catch {
    return found
  }
  const parsed = siblingManifestSchema.safeParse(raw)
  if (!parsed.success) return found
  for (const [name, body] of Object.entries(parsed.data)) {
    assertSafeSiblingName(name)
    found.set(name, body)
  }
  return found
}

export function siblingSourceDir(addonDir: string, siblingName: string): string {
  assertSafeSiblingName(siblingName)
  return join(addonDir, SIBLING_ADDONS_DIR, siblingName)
}

export function siblingDistDir(buildRoot: string, siblingName: string): string {
  assertSafeSiblingName(siblingName)
  return join(buildRoot, "dist", siblingName)
}
