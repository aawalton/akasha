import type { AdvancedSheetFormat } from "akasha/temper/player/completion/modules/completion-record/completion-record.module.code.ts"
import "akasha/temper/eso/type/eso-enums-05/eso-enums-05.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-02/eso-functions-02.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"

const NAMES: ReadonlyArray<readonly [string, AdvancedStatDisplayType]> = [
  ["alliance-points-bonus", ADVANCED_STAT_DISPLAY_TYPE_ALLIANCE_POINTS_BONUS],
  ["all-xp", ADVANCED_STAT_DISPLAY_TYPE_ALL_XP],
  ["armor", ADVANCED_STAT_DISPLAY_TYPE_ARMOR],
  ["armor-cap", ADVANCED_STAT_DISPLAY_TYPE_ARMOR_CAP],
  ["bash-cost", ADVANCED_STAT_DISPLAY_TYPE_BASH_COST],
  ["bash-damage", ADVANCED_STAT_DISPLAY_TYPE_BASH_DAMAGE],
  ["bleed-damage", ADVANCED_STAT_DISPLAY_TYPE_BLEED_DAMAGE],
  ["bleed-resist", ADVANCED_STAT_DISPLAY_TYPE_BLEED_RESIST],
  ["block-cost", ADVANCED_STAT_DISPLAY_TYPE_BLOCK_COST],
  ["block-mitigation", ADVANCED_STAT_DISPLAY_TYPE_BLOCK_MITIGATION],
  ["block-speed", ADVANCED_STAT_DISPLAY_TYPE_BLOCK_SPEED],
  ["cc-break-cost", ADVANCED_STAT_DISPLAY_TYPE_CC_BREAK_COST],
  ["coin-bonus", ADVANCED_STAT_DISPLAY_TYPE_COIN_BONUS],
  ["cold-damage", ADVANCED_STAT_DISPLAY_TYPE_COLD_DAMAGE],
  ["cold-resist", ADVANCED_STAT_DISPLAY_TYPE_COLD_RESIST],
  ["critical-chance", ADVANCED_STAT_DISPLAY_TYPE_CRITICAL_CHANCE],
  ["critical-damage", ADVANCED_STAT_DISPLAY_TYPE_CRITICAL_DAMAGE],
  ["critical-healing", ADVANCED_STAT_DISPLAY_TYPE_CRITICAL_HEALING],
  ["critical-percent", ADVANCED_STAT_DISPLAY_TYPE_CRITICAL_PERCENT],
  ["critical-percent-cap", ADVANCED_STAT_DISPLAY_TYPE_CRITICAL_PERCENT_CAP],
  ["critical-resist", ADVANCED_STAT_DISPLAY_TYPE_CRITICAL_RESIST],
  ["disease-damage", ADVANCED_STAT_DISPLAY_TYPE_DISEASE_DAMAGE],
  ["disease-resist", ADVANCED_STAT_DISPLAY_TYPE_DISEASE_RESIST],
  ["dodge-cost", ADVANCED_STAT_DISPLAY_TYPE_DODGE_COST],
  ["earth-damage", ADVANCED_STAT_DISPLAY_TYPE_EARTH_DAMAGE],
  ["earth-resist", ADVANCED_STAT_DISPLAY_TYPE_EARTH_RESIST],
  ["fire-damage", ADVANCED_STAT_DISPLAY_TYPE_FIRE_DAMAGE],
  ["fire-resist", ADVANCED_STAT_DISPLAY_TYPE_FIRE_RESIST],
  ["frost-resist", ADVANCED_STAT_DISPLAY_TYPE_FROST_RESIST],
  ["generic-damage", ADVANCED_STAT_DISPLAY_TYPE_GENERIC_DAMAGE],
  ["generic-resist", ADVANCED_STAT_DISPLAY_TYPE_GENERIC_RESIST],
  ["healing-done", ADVANCED_STAT_DISPLAY_TYPE_HEALING_DONE],
  ["healing-done-bonuses", ADVANCED_STAT_DISPLAY_TYPE_HEALING_DONE_BONUSES],
  ["healing-taken", ADVANCED_STAT_DISPLAY_TYPE_HEALING_TAKEN],
  ["healing-taken-bonuses", ADVANCED_STAT_DISPLAY_TYPE_HEALING_TAKEN_BONUSES],
  ["inspiration-bonus", ADVANCED_STAT_DISPLAY_TYPE_INSPIRATION_BONUS],
  ["magic-damage", ADVANCED_STAT_DISPLAY_TYPE_MAGIC_DAMAGE],
  ["magic-resist", ADVANCED_STAT_DISPLAY_TYPE_MAGIC_RESIST],
  ["monster-kill-xp", ADVANCED_STAT_DISPLAY_TYPE_MONSTER_KILL_XP],
  ["oblivion-damage", ADVANCED_STAT_DISPLAY_TYPE_OBLIVION_DAMAGE],
  ["oblivion-resist", ADVANCED_STAT_DISPLAY_TYPE_OBLIVION_RESIST],
  ["physical-damage", ADVANCED_STAT_DISPLAY_TYPE_PHYSICAL_DAMAGE],
  ["physical-penetration", ADVANCED_STAT_DISPLAY_TYPE_PHYSICAL_PENETRATION],
  ["physical-resist", ADVANCED_STAT_DISPLAY_TYPE_PHYSICAL_RESIST],
  ["player-kill-xp", ADVANCED_STAT_DISPLAY_TYPE_PLAYER_KILL_XP],
  ["poison-damage", ADVANCED_STAT_DISPLAY_TYPE_POISON_DAMAGE],
  ["poison-resist", ADVANCED_STAT_DISPLAY_TYPE_POISON_RESIST],
  ["shock-damage", ADVANCED_STAT_DISPLAY_TYPE_SHOCK_DAMAGE],
  ["shock-resist", ADVANCED_STAT_DISPLAY_TYPE_SHOCK_RESIST],
  ["sneak-cost", ADVANCED_STAT_DISPLAY_TYPE_SNEAK_COST],
  ["sneak-speed-reduction", ADVANCED_STAT_DISPLAY_TYPE_SNEAK_SPEED_REDUCTION],
  ["spell-penetration", ADVANCED_STAT_DISPLAY_TYPE_SPELL_PENETRATION],
  ["spell-resist", ADVANCED_STAT_DISPLAY_TYPE_SPELL_RESIST],
  ["sprint-cost", ADVANCED_STAT_DISPLAY_TYPE_SPRINT_COST],
  ["sprint-speed", ADVANCED_STAT_DISPLAY_TYPE_SPRINT_SPEED],
  ["subscriber-alliance-points-bonus", ADVANCED_STAT_DISPLAY_TYPE_SUBSCRIBER_ALLIANCE_POINTS_BONUS],
  ["subscriber-all-xp", ADVANCED_STAT_DISPLAY_TYPE_SUBSCRIBER_ALL_XP],
  ["subscriber-coin-bonus", ADVANCED_STAT_DISPLAY_TYPE_SUBSCRIBER_COIN_BONUS],
  ["subscriber-inspiration-bonus", ADVANCED_STAT_DISPLAY_TYPE_SUBSCRIBER_INSPIRATION_BONUS],
  ["subscriber-telvar-bonus", ADVANCED_STAT_DISPLAY_TYPE_SUBSCRIBER_TELVAR_BONUS],
  ["telvar-bonus", ADVANCED_STAT_DISPLAY_TYPE_TELVAR_BONUS],
  ["ultimate-regen-combat", ADVANCED_STAT_DISPLAY_TYPE_ULTIMATE_REGEN_COMBAT],
]

const FORMATS: ReadonlyArray<readonly [AdvancedStatDisplayFormat, AdvancedSheetFormat]> = [
  [ADVANCED_STAT_DISPLAY_FORMAT_FLAT, "flat"],
  [ADVANCED_STAT_DISPLAY_FORMAT_PERCENT, "percent"],
  [ADVANCED_STAT_DISPLAY_FORMAT_FLAT_AND_PERCENT, "flat-and-percent"],
  [ADVANCED_STAT_DISPLAY_FORMAT_FLAT_OR_PERCENT, "flat-or-percent"],
]

type AdvancedSheetValue = {
  category: string
  label: string
  format: AdvancedSheetFormat
  flat?: number
  percent?: number
}

const LABEL_FORMAT = "<<t:1>>"

function formatOf(format: AdvancedStatDisplayFormat): AdvancedSheetFormat {
  for (const [code, name] of FORMATS) if (code === format) return name
  return "none"
}

function nameOf(statType: AdvancedStatDisplayType): string {
  for (const [name, named] of NAMES) if (named === statType) return name
  return `display-type-${String(statType)}`
}

function statValue(
  category: string,
  label: string,
  statType: AdvancedStatDisplayType
): AdvancedSheetValue {
  const [format, flat, percent] = GetAdvancedStatValue(statType)
  const value: AdvancedSheetValue = {
    category,
    label: zo_strformat(LABEL_FORMAT, label),
    format: formatOf(format),
  }
  if (flat !== undefined) value.flat = flat
  if (percent !== undefined) value.percent = percent
  return value
}

export function advancedSheet(): Record<string, AdvancedSheetValue> {
  const sheet: Record<string, AdvancedSheetValue> = {}
  const categories = GetNumAdvancedStatCategories()
  for (let categoryIndex = 1; categoryIndex <= categories; categoryIndex++) {
    const categoryId = GetAdvancedStatsCategoryId(categoryIndex)
    const [category, stats] = GetAdvancedStatCategoryInfo(categoryId)
    for (let statIndex = 1; statIndex <= stats; statIndex++) {
      const [statType, label] = GetAdvancedStatInfo(categoryId, statIndex)
      sheet[nameOf(statType)] = statValue(category, label, statType)
    }
  }
  return sheet
}

export function advancedSheetSaid(): string {
  const said: string[] = []
  for (const [name, value] of Object.entries(advancedSheet())) {
    said.push(`${name}:${value.flat ?? ""}/${value.percent ?? ""}`)
  }
  said.sort()
  return said.join(",")
}
