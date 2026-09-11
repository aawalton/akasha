import { resolve } from "node:path"
import type { AddonDataPages } from "akasha/temper/addon-data/addon-data-pages/addon-data-pages.module.code.ts"
import { buildAddonDataWritesAlchemy } from "akasha/temper/addon-data/addon-data-writes-alchemy/addon-data-writes-alchemy.module.code.ts"
import { buildAddonDataWritesCodec } from "akasha/temper/addon-data/addon-data-writes-codec/addon-data-writes-codec.module.code.ts"
import { buildAddonDataWritesCompanionMappings } from "akasha/temper/addon-data/addon-data-writes-companion-mappings/addon-data-writes-companion-mappings.module.code.ts"
import { buildAddonDataWritesEquipment } from "akasha/temper/addon-data/addon-data-writes-equipment/addon-data-writes-equipment.module.code.ts"
import { buildAddonDataWritesInventory } from "akasha/temper/addon-data/addon-data-writes-inventory/addon-data-writes-inventory.module.code.ts"
import { buildAddonDataWritesRules } from "akasha/temper/addon-data/addon-data-writes-rules/addon-data-writes-rules.module.code.ts"
import { buildAddonDataWritesScribing } from "akasha/temper/addon-data/addon-data-writes-scribing/addon-data-writes-scribing.module.code.ts"
import { buildAddonDataWritesSets } from "akasha/temper/addon-data/addon-data-writes-sets/addon-data-writes-sets.module.code.ts"
import { buildAddonDataWritesSkills } from "akasha/temper/addon-data/addon-data-writes-skills/addon-data-writes-skills.module.code.ts"
import { buildAddonDataWritesStats } from "akasha/temper/addon-data/addon-data-writes-stats/addon-data-writes-stats.module.code.ts"
import { built } from "akasha/temper/addon-data/failing-alone/failing-alone.module.code.ts"

export type AddonDataWrite = (dir: string, name: string, source: string) => Promise<number>

export const writeToDisk: AddonDataWrite = (dir, name, source) =>
  Bun.write(resolve(dir, name), source)

export type AddonDataSection = readonly [
  string,
  (p: AddonDataPages, w: AddonDataWrite) => readonly Promise<number>[],
]

export const ADDON_DATA_SECTIONS: readonly AddonDataSection[] = [
  ["codec", (_p, w) => buildAddonDataWritesCodec(w)],
  ["equipment", buildAddonDataWritesEquipment],
  ["sets", buildAddonDataWritesSets],
  ["alchemy", buildAddonDataWritesAlchemy],
  ["inventory", buildAddonDataWritesInventory],
  ["rules", buildAddonDataWritesRules],
  ["scribing", buildAddonDataWritesScribing],
  ["stats", buildAddonDataWritesStats],
  ["companion-mappings", (_p, w) => buildAddonDataWritesCompanionMappings(w)],
  ["skills", buildAddonDataWritesSkills],
]

export function buildAddonDataWrites(
  p: AddonDataPages,
  w: AddonDataWrite = writeToDisk
): readonly Promise<number>[] {
  return ADDON_DATA_SECTIONS.flatMap(([name, build]) => built(name, build, p, w))
}
