import { existsSync } from "node:fs"
import { dirname, join, relative } from "node:path"
import { exportedAs } from "akasha/pages/export-name/page-export-name.module.code.ts"
import { besideAt } from "akasha/pages/file-name/page-file-name.module.code.ts"
import { valuesOfType } from "akasha/pages/indexes/reading/index-reading.module.code.ts"
import { textAt } from "akasha/pages/value/page-value.module.code.ts"

export const GAME_MANIFEST_NAME = "addon.json"

export const ADDON_MANIFEST = "addon-manifest"

const ESO_ADDON = "eso-addon"

const OUTSIDE = ".."

export function addonFilePathIn(root: string, dir: string, propertySlug: string): string | null {
  const rel = relative(root, dir)
  if (rel === "" || rel === OUTSIDE || rel.startsWith(`${OUTSIDE}/`)) return null
  const key = exportedAs(propertySlug)
  const found: string[] = []
  for (const one of valuesOfType(root, ESO_ADDON)) {
    if (dirname(one.path) !== rel) continue
    const held = textAt(one.value, key)
    const made = held === null ? null : besideAt(one.path, propertySlug, held)
    if (made !== null) found.push(made)
  }
  found.sort()
  const first = found[0]
  if (first === undefined) return null
  if (found.length > 1) {
    throw new Error(
      `${dir} holds ${String(found.length)} \`${ESO_ADDON}\` pages carrying a \`${propertySlug}\` (${found.join(", ")}) — one folder holds one addon, so which of them the game reads cannot be worked out`
    )
  }
  return join(root, first)
}

export function addonManifestPathIn(root: string, dir: string): string | null {
  const game = join(dir, GAME_MANIFEST_NAME)
  if (existsSync(game)) return game
  return addonFilePathIn(root, dir, ADDON_MANIFEST)
}
