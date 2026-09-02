import { getInfusedArmorBonus } from "@akasha/temper-equipment/armor-traits"
import { isLargeArmorEnchantSlot } from "@akasha/temper-equipment-kinds/armor-types"
import {
  type EquipmentQualityId,
  minQuality,
  resolveQuality,
} from "@akasha/temper-equipment-kinds/equipment-qualities"
import type { MetricEffect } from "@akasha/temper-formula-framework/effect"
import { updateEffectValue } from "@akasha/temper-formula-framework/effect-value-update"
import { assertNever } from "@akasha/utils-narrow/assert-never"
import { createDataFile } from "@akasha/utils-narrow/create-data-file"
import type { ArmorItem } from "../item-composites/item-composites.module.code.ts"
export const TEMPER_ARMOR_ENCHANTS_BY_ID = {
  "no-enchant": {
    id: "no-enchant" as const,
    name: "No Enchant",
    glyphName: "",
    essenceRune: "",
    effect: "",
    effects: [],
    esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_NONE",
  },
  "health": {
    id: "health" as const,
    name: "Health",
    glyphName: "Glyph of Health",
    essenceRune: "Oko",
    effect: "Increases Maximum Health",
    effects: [
      { metricId: "health-maximum" as const, effectType: "integer" as const, effectValue: 954 },
    ],
    esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_HEALTH",
  },
  "magicka": {
    id: "magicka" as const,
    name: "Magicka",
    glyphName: "Glyph of Magicka",
    essenceRune: "Makko",
    effect: "Increases Maximum Magicka",
    effects: [
      { metricId: "magicka-maximum" as const, effectType: "integer" as const, effectValue: 868 },
    ],
    esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_MAGICKA",
  },
  "stamina": {
    id: "stamina" as const,
    name: "Stamina",
    glyphName: "Glyph of Stamina",
    essenceRune: "Deni",
    effect: "Increases Maximum Stamina",
    effects: [
      { metricId: "stamina-maximum" as const, effectType: "integer" as const, effectValue: 868 },
    ],
    esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_STAMINA",
  },
  "prismatic-defense": {
    id: "prismatic-defense" as const,
    name: "Prismatic Defense",
    glyphName: "Glyph of Prismatic Defense",
    essenceRune: "Hakeijo",
    effect: "Increases Maximum Health, Magicka, and Stamina",
    effects: [
      { metricId: "health-maximum" as const, effectType: "integer" as const, effectValue: 477 },
      { metricId: "magicka-maximum" as const, effectType: "integer" as const, effectValue: 434 },
      { metricId: "stamina-maximum" as const, effectType: "integer" as const, effectValue: 434 },
    ],
    esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_PRISMATIC_DEFENSE",
  },
} as const satisfies Record<string, ArmorEnchantTemplate>

export const TEMPER_ARMOR_ENCHANT_QUALITY_VALUES = {
  "health": { "health": { normal: 734, fine: 774, superior: 839, epic: 882, legendary: 954 } },
  "magicka": { "magicka": { normal: 668, fine: 704, superior: 763, epic: 802, legendary: 868 } },
  "stamina": { "stamina": { normal: 668, fine: 704, superior: 763, epic: 802, legendary: 868 } },
  "prismatic-defense": {
    "prismatic-health": { normal: 381, fine: 405, superior: 429, epic: 453, legendary: 477 },
    "prismatic-resource": { normal: 347, fine: 368, superior: 390, epic: 412, legendary: 434 },
  },
} as const satisfies Record<string, ArmorEnchantQualityComponents>

export type ArmorEnchantQualityValues = Record<EquipmentQualityId, number>

export type ArmorEnchantQualityComponents = Readonly<Record<string, ArmorEnchantQualityValues>>

export interface ArmorEnchantTemplate {
  id: string
  name: string
  glyphName: string
  essenceRune: string
  effect: string
  effects: readonly MetricEffect[]
  esoEnchantConstantName: string
}

export const armorEnchants = createDataFile<ArmorEnchantTemplate>()(TEMPER_ARMOR_ENCHANTS_BY_ID)

export type ArmorEnchantId = (typeof armorEnchants.ids)[number]

const SMALL_PIECE_MULTIPLIER = 0.4045

function scaleIntegerEffectValue(value: number, isLarge: boolean): number {
  return isLarge ? value : Math.round(value * SMALL_PIECE_MULTIPLIER)
}

export function getArmorEnchantmentEffects(armor: ArmorItem): readonly MetricEffect[] {
  const enchantConfig = armorEnchants.data[armor.enchantment]
  if (!enchantConfig) {
    return []
  }

  const isLarge = isLargeArmorEnchantSlot(armor.type)

  const itemQuality = resolveQuality(armor.quality)
  const enchantQuality = minQuality(armor.enchantmentQuality ?? "legendary", itemQuality)

  let effects: MetricEffect[]

  switch (armor.enchantment) {
    case "health": {
      const largeValue = TEMPER_ARMOR_ENCHANT_QUALITY_VALUES.health.health[enchantQuality]
      const value = scaleIntegerEffectValue(largeValue, isLarge)
      effects = [
        {
          metricId: "health-maximum" as const,
          effectType: "integer" as const,
          effectValue: value,
        },
      ]
      break
    }

    case "magicka": {
      const largeValue = TEMPER_ARMOR_ENCHANT_QUALITY_VALUES.magicka.magicka[enchantQuality]
      const value = scaleIntegerEffectValue(largeValue, isLarge)
      effects = [
        {
          metricId: "magicka-maximum" as const,
          effectType: "integer" as const,
          effectValue: value,
        },
      ]
      break
    }

    case "stamina": {
      const largeValue = TEMPER_ARMOR_ENCHANT_QUALITY_VALUES.stamina.stamina[enchantQuality]
      const value = scaleIntegerEffectValue(largeValue, isLarge)
      effects = [
        {
          metricId: "stamina-maximum" as const,
          effectType: "integer" as const,
          effectValue: value,
        },
      ]
      break
    }

    case "prismatic-defense": {
      const prismaticComponents = TEMPER_ARMOR_ENCHANT_QUALITY_VALUES["prismatic-defense"]
      const healthLarge = prismaticComponents["prismatic-health"][enchantQuality]
      const resourceLarge = prismaticComponents["prismatic-resource"][enchantQuality]
      const healthValue = scaleIntegerEffectValue(healthLarge, isLarge)
      const resourceValue = scaleIntegerEffectValue(resourceLarge, isLarge)
      effects = [
        {
          metricId: "health-maximum" as const,
          effectType: "integer" as const,
          effectValue: healthValue,
        },
        {
          metricId: "magicka-maximum" as const,
          effectType: "integer" as const,
          effectValue: resourceValue,
        },
        {
          metricId: "stamina-maximum" as const,
          effectType: "integer" as const,
          effectValue: resourceValue,
        },
      ]
      break
    }

    case "no-enchant":
      effects = enchantConfig.effects.map((effect) => {
        if (!isLarge && effect.effectType === "integer") {
          return {
            ...effect,
            effectValue: Math.round(effect.effectValue * SMALL_PIECE_MULTIPLIER),
          }
        }
        return effect
      })
      break

    default:
      assertNever(armor.enchantment)
  }

  if (armor.trait === "infused") {
    const infusedBonus = getInfusedArmorBonus(itemQuality)
    return effects.map((effect) =>
      updateEffectValue(effect, (value) => value + Math.floor(value * infusedBonus))
    )
  }

  return effects
}
