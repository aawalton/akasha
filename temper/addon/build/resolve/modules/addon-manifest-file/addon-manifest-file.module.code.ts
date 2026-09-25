import { existsSync } from "node:fs"
import { dirname, join, relative } from "node:path"
import { valuesOfType } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { exportedAs } from "akasha/page/modules/export-name/page-export-name.module.code.ts"
import { besideAt } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import {
  textAt,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const GAME_MANIFEST_NAME = "addon.json"

const ADDON_MANIFEST = "addon-manifest"

const TEMPER_ADDON = "temper-addon"

const OUTSIDE = ".."

function besidePage(page: string, value: Value, propertySlug: string): string | null {
  const held = textAt(value, exportedAs(propertySlug))
  return held === null ? null : besideAt(page, propertySlug, held)
}

export function manifestBeside(
  page: string,
  value: Value,
  holds: (path: string) => boolean
): string | null {
  const game = join(dirname(page), GAME_MANIFEST_NAME)
  return holds(game) ? game : besidePage(page, value, ADDON_MANIFEST)
}

export function addonFilePathIn(root: string, dir: string, propertySlug: string): string | null {
  const rel = relative(root, dir)
  if (rel === "" || rel === OUTSIDE || rel.startsWith(`${OUTSIDE}/`)) return null
  const found: string[] = []
  for (const one of valuesOfType(root, TEMPER_ADDON)) {
    if (dirname(one.path) !== rel) continue
    const made = besidePage(one.path, one.value, propertySlug)
    if (made !== null) found.push(made)
  }
  found.sort()
  const first = found[0]
  if (first === undefined) return null
  if (found.length > 1) {
    throw new Error(
      `${dir} holds ${String(found.length)} \`${TEMPER_ADDON}\` pages carrying a \`${propertySlug}\` (${found.join(", ")}) — one folder holds one addon, so which of them the game reads cannot be worked out`
    )
  }
  return join(root, first)
}

export function addonManifestPathIn(root: string, dir: string): string | null {
  const game = join(dir, GAME_MANIFEST_NAME)
  if (existsSync(game)) return game
  return addonFilePathIn(root, dir, ADDON_MANIFEST)
}
