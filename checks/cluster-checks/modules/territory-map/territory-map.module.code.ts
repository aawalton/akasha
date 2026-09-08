import { existsSync, readdirSync } from "node:fs"
import { join, resolve } from "node:path"
import { akashaValuesAt } from "@akasha/pages/akasha-page-values"
import { ownRepoRoot } from "@akasha/pages/checkout-roots"
import { textIn } from "@akasha/pages/page-value-reading"
import { listWorkspaceDirs } from "@akasha/workspace-paths/workspace-dirs"

export const TERRITORY_MAP_PATH = "code-system/held-addons/pages"

const HELD_ADDON_PAGE = ".held-addon.ts"

const ESO_ADDON_PAGE = ".eso-addon.ts"

export type TerritoryNode = {
  readonly addon: string
  readonly package: string
}

export type TerritoryMap = {
  readonly addons: readonly TerritoryNode[]
}

export function territoryMapDir(): string {
  return resolve(ownRepoRoot(), TERRITORY_MAP_PATH)
}

function esoAddonDirs(root: string): ReadonlyMap<string, string> {
  const dirs = new Map<string, string>()
  for (const rel of listWorkspaceDirs(root)) {
    const at = join(root, rel)
    if (!existsSync(at)) continue
    for (const entry of readdirSync(at)) {
      if (!entry.endsWith(ESO_ADDON_PAGE)) continue
      dirs.set(entry.slice(0, -ESO_ADDON_PAGE.length), rel)
    }
  }
  return dirs
}

export function readTerritoryMap(): TerritoryMap {
  const root = ownRepoRoot()
  const dir = territoryMapDir()
  const dirs = esoAddonDirs(root)
  const addons: TerritoryNode[] = []
  for (const entry of readdirSync(dir).sort()) {
    if (!entry.endsWith(HELD_ADDON_PAGE)) continue
    const rel = `${TERRITORY_MAP_PATH}/${entry}`
    const values = akashaValuesAt(root, rel)
    if (values === null) throw new Error(`${rel} will not load, so a run over it reads no addon`)
    const addon = textIn(values, "addon-name")
    const named = textIn(values, "eso-addon-slug")
    if (addon === null || named === null) {
      throw new Error(`${rel} names no addon or no addon page`)
    }
    const held = dirs.get(named)
    if (held === undefined) {
      throw new Error(`${rel} names the addon page \`${named}\`, and no folder holds that page`)
    }
    addons.push({ addon, package: held })
  }
  if (addons.length === 0) {
    throw new Error(`${dir} names no addon, so a run over it has nothing to look at`)
  }
  return { addons }
}
