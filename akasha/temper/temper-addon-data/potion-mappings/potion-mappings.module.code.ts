import { potions } from "@akasha/temper-alchemy/potion-source"
import { ALCHEMY_EFFECT_IDS } from "@akasha/temper-alchemy/potion-traits"

const METRIC_TO_ALCHEMY_TRAIT: Record<string, number> = {
  "resistance-physical": ALCHEMY_EFFECT_IDS["increase-armor"],
  "resistance-spell": ALCHEMY_EFFECT_IDS["spell-resistance"],
  "stealth-detection": ALCHEMY_EFFECT_IDS["detection"],
}

const BUFF_TO_ALCHEMY_TRAIT: Record<string, number> = {
  "major-sorcery": ALCHEMY_EFFECT_IDS["spell-power"],
  "major-brutality": ALCHEMY_EFFECT_IDS["weapon-power"],
  "major-prophecy": ALCHEMY_EFFECT_IDS["spell-critical"],
  "major-savagery": ALCHEMY_EFFECT_IDS["weapon-critical"],
  vanish: ALCHEMY_EFFECT_IDS["invisible"],
  "major-expedition": ALCHEMY_EFFECT_IDS["speed"],
  "minor-protection": ALCHEMY_EFFECT_IDS["protection"],
  "major-vitality": ALCHEMY_EFFECT_IDS["vitality"],
  "minor-heroism": ALCHEMY_EFFECT_IDS["heroism"],
}

const SECONDARY_BUFFS = new Set(["major-fortitude", "major-intellect", "major-endurance"])

function getAlchemyTraitsForPotion(
  effects: ReadonlyArray<{ metricId?: string; effectType?: string; buffId?: string }>
): readonly number[] | null {
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
  const unique = [...new Set(traits)].sort((a, b) => a - b)
  return unique
}

function computeEncodedTraitsFromAlchemyTraits(
  traits: readonly number[],
  isThreeReagent: boolean
): number {
  if (traits.length === 0) return 0
  const effect1 = traits[0] ?? 0
  const effect2 = traits[1] ?? 0
  const effect3 = traits[2] ?? 0
  const reagent3Flag = isThreeReagent ? 0x80 : 0
  return ((effect1 | reagent3Flag) << 16) | (effect2 << 8) | effect3
}

export function generatePotionMappings(): string {
  const itemIdIndexEntries: string[] = []
  const itemIdTemperIdEntries: string[] = []
  const encodedTraitsIndexEntries: string[] = []
  const encodedTraitsTemperIdEntries: string[] = []
  const skippedPotions: string[] = []

  for (const [i, id] of potions.ids.entries()) {
    const potion = potions.data[id]
    if (potion === undefined) continue

    if (potion.subcategoryId === "none") continue

    if (potion.subcategoryId === "crown" || potion.subcategoryId === "dropped") {
      if (potion.itemId === 0) continue
      itemIdIndexEntries.push(`  [${potion.itemId}]: ${i}, // ${potion.name}`)
      itemIdTemperIdEntries.push(`  [${potion.itemId}]: "${potion.id}", // ${potion.name}`)
    } else if (potion.subcategoryId === "crafted") {
      const traits = getAlchemyTraitsForPotion(potion.effects)
      if (traits === null) {
        skippedPotions.push(potion.id)
        continue
      }
      const isThreeReagent =
        potion.reagents !== undefined &&
        potion.reagents.length > 0 &&
        (potion.reagents[0]?.length ?? 0) >= 3
      const encodedTraits = computeEncodedTraitsFromAlchemyTraits(traits, isThreeReagent)
      if (encodedTraits === 0) continue
      encodedTraitsIndexEntries.push(
        `  [${encodedTraits}]: ${i}, // ${potion.name} (traits: ${traits.join(",")})`
      )
      encodedTraitsTemperIdEntries.push(`  [${encodedTraits}]: "${potion.id}", // ${potion.name}`)
    }
  }

  if (skippedPotions.length > 0) {
    console.log(
      `  Skipped ${skippedPotions.length} potions with unknown alchemy effects (heroism): ${skippedPotions.join(", ")}`
    )
  }

  return `\
/**
 * Potion Mappings (Generated)
 *
 * Maps ESO potion item IDs and crafted potion encoded traits to temper indices and string IDs.
 * Crown/dropped potions match by itemId, crafted potions match by encodedTraits
 * (packed alchemy effect IDs from the item link's PotionData field).
 *
 * Source: engine/alchemy/potions-source.ts, engine/alchemy/potion-encoded-traits.ts
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

/** Crown/dropped potion itemId → codec index */
export const POTION_ITEM_ID_TO_INDEX: Record<number, number> = {
${itemIdIndexEntries.join("\n")}
}

/** Crown/dropped potion itemId → temper ID */
export const POTION_ITEM_ID_TO_TEMPER_ID: Record<number, string> = {
${itemIdTemperIdEntries.join("\n")}
}

/** Crafted potion encodedTraits → codec index */
export const POTION_ENCODED_TRAITS_TO_INDEX: Record<number, number> = {
${encodedTraitsIndexEntries.join("\n")}
}

/** Crafted potion encodedTraits → temper ID */
export const POTION_ENCODED_TRAITS_TO_TEMPER_ID: Record<number, string> = {
${encodedTraitsTemperIdEntries.join("\n")}
}

/**
 * Parse PotionData from an ESO item link.
 * PotionData is the last colon-separated field before |h in the link.
 * Returns 0 for crown/dropped potions, non-zero for crafted potions.
 *
 * \`string.match\` returns \`LuaMultiReturn<string[]>\`; destructure at the
 * boundary so the rest of the function flows plain values (the
 * \`tstl-no-multi-store\` plugin disallows forwarding the multi-return).
 */
export function parsePotionData(itemLink: string): number {
  const [potionData] = string.match(itemLink, ":(%d+)|h")
  if (potionData !== undefined) {
    return tonumber(potionData) ?? 0
  }
  return 0
}

export function getPotionIndex(itemId: number, encodedTraits: number): number {
  if (encodedTraits !== 0) {
    return POTION_ENCODED_TRAITS_TO_INDEX[encodedTraits] ?? 0
  }
  return POTION_ITEM_ID_TO_INDEX[itemId] ?? 0
}

export function getPotionTemperId(itemId: number, encodedTraits: number): string {
  if (encodedTraits !== 0) {
    return POTION_ENCODED_TRAITS_TO_TEMPER_ID[encodedTraits] ?? "no-potion"
  }
  return POTION_ITEM_ID_TO_TEMPER_ID[itemId] ?? "no-potion"
}
`
}
