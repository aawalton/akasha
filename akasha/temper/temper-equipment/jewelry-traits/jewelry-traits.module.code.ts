import type { EquipmentQualityId } from "@akasha/temper-equipment-kinds/equipment-qualities"
import type { MetricEffect } from "@akasha/temper-formula-framework/effect"
import { createDataFile } from "@akasha/utils-narrow/create-data-file"

export type JewelryTraitQualityValues = Record<EquipmentQualityId, number>

export interface JewelryTraitTemplate {
  id: string
  name: string
  material: string
  effect: string
  effects: readonly MetricEffect[]
  esoTraitConstantName: string
}

const JEWELRY_TRAIT_DATA = {
  "no-trait": {
    id: "no-trait" as const,
    name: "No Trait",
    material: "",
    effect: "",
    effects: [],
    esoTraitConstantName: "ITEM_TRAIT_TYPE_NONE",
  },
  "arcane": {
    id: "arcane" as const,
    name: "Arcane",
    material: "Cobalt",
    effect: "Increases Maximum Magicka",
    effects: [{ metricId: "magicka-maximum" as const, effectType: "integer", effectValue: 877 }],
    esoTraitConstantName: "ITEM_TRAIT_TYPE_JEWELRY_ARCANE",
  },
  "bloodthirsty": {
    id: "bloodthirsty" as const,
    name: "Bloodthirsty",
    material: "Slaughterstone",
    effect:
      "Increases Weapon and Spell Damage against enemies under 90% Health (scales with missing health)",
    effects: [],
    esoTraitConstantName: "ITEM_TRAIT_TYPE_JEWELRY_BLOODTHIRSTY",
  },
  "harmony": {
    id: "harmony" as const,
    name: "Harmony",
    material: "Dibellium",
    effect: "Activating a synergy restores 880 Health, Magicka, and Stamina",
    effects: [],
    esoTraitConstantName: "ITEM_TRAIT_TYPE_JEWELRY_HARMONY",
  },
  "healthy": {
    id: "healthy" as const,
    name: "Healthy",
    material: "Antimony",
    effect: "Increases Maximum Health",
    effects: [{ metricId: "health-maximum" as const, effectType: "integer", effectValue: 965 }],
    esoTraitConstantName: "ITEM_TRAIT_TYPE_JEWELRY_HEALTHY",
  },
  "infused": {
    id: "infused" as const,
    name: "Infused",
    material: "Aurbic Amber",
    effect: "Increases Jewelry Enchantment effect",
    effects: [],
    esoTraitConstantName: "ITEM_TRAIT_TYPE_JEWELRY_INFUSED",
  },
  "protective": {
    id: "protective" as const,
    name: "Protective",
    material: "Titanium",
    effect: "Increases Physical and Spell Resistance",
    effects: [{ metricId: "resistance" as const, effectType: "integer", effectValue: 1844 }],
    esoTraitConstantName: "ITEM_TRAIT_TYPE_JEWELRY_PROTECTIVE",
  },
  "robust": {
    id: "robust" as const,
    name: "Robust",
    material: "Zinc",
    effect: "Increases Maximum Stamina",
    effects: [{ metricId: "stamina-maximum" as const, effectType: "integer", effectValue: 877 }],
    esoTraitConstantName: "ITEM_TRAIT_TYPE_JEWELRY_ROBUST",
  },
  "swift": {
    id: "swift" as const,
    name: "Swift",
    material: "Gilding Wax",
    effect: "Increases Movement Speed",
    effects: [
      { metricId: "movement-speed" as const, effectType: "fractional-change", effectValue: 0.07 },
    ],
    esoTraitConstantName: "ITEM_TRAIT_TYPE_JEWELRY_SWIFT",
  },
  "triune": {
    id: "triune" as const,
    name: "Triune",
    material: "Dawn-Prism",
    effect: "Increases Maximum Health, Magicka, and Stamina",
    effects: [
      { metricId: "health-maximum" as const, effectType: "integer", effectValue: 482 },
      { metricId: "magicka-maximum" as const, effectType: "integer", effectValue: 439 },
      { metricId: "stamina-maximum" as const, effectType: "integer", effectValue: 439 },
    ],
    esoTraitConstantName: "ITEM_TRAIT_TYPE_JEWELRY_TRIUNE",
  },
  "ornate": {
    id: "ornate" as const,
    name: "Ornate",
    material: "",
    effect: "Increases sell price",
    effects: [],
    esoTraitConstantName: "ITEM_TRAIT_TYPE_JEWELRY_ORNATE",
  },
  "intricate": {
    id: "intricate" as const,
    name: "Intricate",
    material: "",
    effect: "Increases Inspiration from deconstruction",
    effects: [],
    esoTraitConstantName: "ITEM_TRAIT_TYPE_JEWELRY_INTRICATE",
  },
} satisfies Record<string, JewelryTraitTemplate>

export const jewelryTraits = createDataFile<JewelryTraitTemplate>()(JEWELRY_TRAIT_DATA)

export type JewelryTraitId = (typeof jewelryTraits.ids)[number]

const NON_BUILD_JEWELRY_TRAITS = new Set(["ornate", "intricate"])

export const jewelryTraitsBuildList = jewelryTraits.list.filter(
  (one) => !NON_BUILD_JEWELRY_TRAITS.has(one.id)
)

export const JEWELRY_TRAIT_QUALITY_VALUES = {
  "arcane": { normal: 767, fine: 797, superior: 827, epic: 847, legendary: 877 },
  "bloodthirsty": { normal: 280, fine: 297, superior: 315, epic: 332, legendary: 350 },
  "harmony": { normal: 704, fine: 748, superior: 792, epic: 836, legendary: 880 },
  "healthy": { normal: 844, fine: 877, superior: 910, epic: 932, legendary: 965 },
  "infused": { normal: 0.24, fine: 0.33, superior: 0.42, epic: 0.51, legendary: 0.6 },
  "protective": { normal: 1624, fine: 1664, superior: 1744, epic: 1804, legendary: 1844 },
  "robust": { normal: 767, fine: 797, superior: 827, epic: 847, legendary: 877 },
  "swift": { normal: 0.03, fine: 0.04, superior: 0.05, epic: 0.06, legendary: 0.07 },
  "triune-health": { normal: 386, fine: 410, superior: 434, epic: 458, legendary: 482 },
  "triune-resource": { normal: 351, fine: 373, superior: 395, epic: 417, legendary: 439 },
} satisfies Record<string, JewelryTraitQualityValues>

export function getInfusedJewelryBonus(quality: EquipmentQualityId = "legendary"): number {
  return JEWELRY_TRAIT_QUALITY_VALUES.infused[quality]
}
