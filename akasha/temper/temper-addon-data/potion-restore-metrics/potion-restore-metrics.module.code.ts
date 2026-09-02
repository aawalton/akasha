import { parseRestoreMetricIdsFromAbilityText } from "@akasha/temper-addon-generators/parse-restore-metrics-from-ability-text"
import { potions } from "@akasha/temper-alchemy/potion-source"
import { ALCHEMY_EFFECT_IDS } from "@akasha/temper-alchemy/potion-traits"
import { isMetricEffect } from "@akasha/temper-formula-framework/effect"

export interface MinedRestorePotion {
  readonly itemId: number
  readonly name: string
  readonly abilityDescription: string
}

const RESTORE_METRIC_IDS = new Set(["health-restore", "magicka-restore", "stamina-restore"])

const SECONDARY_BUFFS = new Set(["major-fortitude", "major-intellect", "major-endurance"])

const METRIC_TO_ALCHEMY_TRAIT: Record<string, number> = {
  "resistance-physical": ALCHEMY_EFFECT_IDS["increase-armor"],
  "resistance-spell": ALCHEMY_EFFECT_IDS["spell-resistance"],
  "stealth-detection": ALCHEMY_EFFECT_IDS.detection,
}

const BUFF_TO_ALCHEMY_TRAIT: Record<string, number> = {
  "major-sorcery": ALCHEMY_EFFECT_IDS["spell-power"],
  "major-brutality": ALCHEMY_EFFECT_IDS["weapon-power"],
  "major-prophecy": ALCHEMY_EFFECT_IDS["spell-critical"],
  "major-savagery": ALCHEMY_EFFECT_IDS["weapon-critical"],
  vanish: ALCHEMY_EFFECT_IDS.invisible,
  "major-expedition": ALCHEMY_EFFECT_IDS.speed,
  "minor-protection": ALCHEMY_EFFECT_IDS.protection,
  "major-vitality": ALCHEMY_EFFECT_IDS.vitality,
  "minor-heroism": ALCHEMY_EFFECT_IDS.heroism,
}

interface EffectLike {
  readonly metricId?: string
  readonly effectType?: string
  readonly buffId?: string
}

function alchemyTraitsForEffects(effects: readonly EffectLike[]): readonly number[] | null {
  const traits: number[] = []
  for (const effect of effects) {
    if (effect.metricId != null) {
      if (effect.metricId === "health-restore") {
        traits.push(
          effect.effectType === "number-per-seconds"
            ? ALCHEMY_EFFECT_IDS["restore-health"]
            : ALCHEMY_EFFECT_IDS["sustained-restore-health"]
        )
      } else if (effect.metricId === "magicka-restore") {
        traits.push(ALCHEMY_EFFECT_IDS["restore-magicka"])
      } else if (effect.metricId === "stamina-restore") {
        traits.push(ALCHEMY_EFFECT_IDS["restore-stamina"])
      } else {
        const trait = METRIC_TO_ALCHEMY_TRAIT[effect.metricId]
        if (trait !== undefined) traits.push(trait)
      }
    } else if (effect.buffId != null) {
      if (SECONDARY_BUFFS.has(effect.buffId)) continue
      const trait = BUFF_TO_ALCHEMY_TRAIT[effect.buffId]
      if (trait !== undefined) traits.push(trait)
    }
  }
  return [...new Set(traits)].sort((a, b) => a - b)
}

function computeEncodedTraits(traits: readonly number[], isThreeReagent: boolean): number {
  if (traits.length === 0) return 0
  const effect1 = traits[0] ?? 0
  const effect2 = traits[1] ?? 0
  const effect3 = traits[2] ?? 0
  const reagent3Flag = isThreeReagent ? 0x80 : 0
  return ((effect1 | reagent3Flag) << 16) | (effect2 << 8) | effect3
}

function restoreMetricsForPotion(effects: readonly EffectLike[]): readonly string[] {
  const restore = effects
    .filter(isMetricEffect)
    .map((e) => e.metricId)
    .filter((metricId): metricId is string => RESTORE_METRIC_IDS.has(metricId))
  return [...new Set(restore)]
}

export function generatePotionRestoreMetrics(
  minedRestorePotions: readonly MinedRestorePotion[]
): string {
  const itemIdEntries: string[] = []
  const encodedTraitsEntries: string[] = []
  const catalogItemIds = new Set<number>()

  for (const id of potions.ids) {
    const potion = potions.data[id]
    if (potion === undefined) continue
    if (potion.subcategoryId === "none") continue

    const metrics = restoreMetricsForPotion(potion.effects)
    const metricsLiteral = `[${metrics.map((m) => `"${m}"`).join(", ")}]`

    if (potion.subcategoryId === "crown" || potion.subcategoryId === "dropped") {
      if (potion.itemId === 0) continue
      catalogItemIds.add(potion.itemId)
      itemIdEntries.push(`  [${potion.itemId}]: ${metricsLiteral}, // ${potion.name}`)
    } else if (potion.subcategoryId === "crafted") {
      const traits = alchemyTraitsForEffects(potion.effects)
      if (traits === null) continue
      const isThreeReagent =
        potion.reagents !== undefined &&
        potion.reagents.length > 0 &&
        (potion.reagents[0]?.length ?? 0) >= 3
      const encodedTraits = computeEncodedTraits(traits, isThreeReagent)
      if (encodedTraits === 0) continue
      encodedTraitsEntries.push(`  [${encodedTraits}]: ${metricsLiteral}, // ${potion.name}`)
    }
  }

  const minedSorted = [...minedRestorePotions].sort((a, b) => a.itemId - b.itemId)
  for (const row of minedSorted) {
    if (catalogItemIds.has(row.itemId)) continue
    const metrics = parseRestoreMetricIdsFromAbilityText(row.abilityDescription)
    if (metrics.length === 0) continue
    const metricsLiteral = `[${metrics.map((m) => `"${m}"`).join(", ")}]`
    itemIdEntries.push(`  [${row.itemId}]: ${metricsLiteral}, // ${row.name}`)
  }

  return `\
/**
 * Potion Restore-Metrics (Generated)
 *
 * Lookup maps for the \`potionEffects\` rule condition. Crown/dropped potions
 * match by \`itemId\`; crafted potions match by \`encodedTraits\` (the packed
 * alchemy effect ids from the item link's PotionData field). Each value is the
 * deduplicated set of restoration metric ids the potion grants
 * (\`health-restore\` / \`magicka-restore\` / \`stamina-restore\`).
 *
 * The crafted (encodedTraits) map is derived purely from the static
 * @temper/game-items-alchemy \`potions.data\` catalog. The crown/dropped (itemId) map is a
 * UNION of catalog-derived entries plus GAME-SOURCED entries parsed from mined
 * potion \`abilityDescription\` text (\`temper-mined-item\` rows): catalog
 * entries are kept byte-identical and mined potions not already in the catalog
 * are appended (sorted ascending by itemId). The static catalog is the same
 * source the addon's \`potion-mappings.generated.ts\` descends from — so the web
 * matcher and the in-game addon classify a potion identically (parity).
 *
 * Pure data (no functions, no bitwise/regex) so it bundles cleanly into the
 * TSTL Lua addon as well as the web build.
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

/** Crown/dropped potion itemId → restore metric ids. */
export const POTION_ITEM_ID_TO_RESTORE_METRICS: Record<number, readonly string[]> = {
${itemIdEntries.join("\n")}
}

/** Crafted potion encodedTraits → restore metric ids. */
export const POTION_ENCODED_TRAITS_TO_RESTORE_METRICS: Record<number, readonly string[]> = {
${encodedTraitsEntries.join("\n")}
}
`
}
