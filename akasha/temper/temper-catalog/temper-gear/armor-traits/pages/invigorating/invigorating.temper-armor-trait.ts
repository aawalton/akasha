import type { TemperArmorTrait } from "../../temper-armor-trait.page-type.ts"

export const invigorating = {
  id: "01a05fb2-1bcf-73a5-a7c0-c033d122331e",
  pageTypeSlug: "temper-armor-trait",
  slug: "invigorating",
  title: "Invigorating",
  key: "invigorating",
  effect: "Increases Health, Magicka, and Stamina Recovery",
  material: "Garnet",
  esoTraitConstantName: "ITEM_TRAIT_TYPE_ARMOR_PROLIFIC",
  displayOrder: 4,
  effects: "jsonl",
  qualityValues: "jsonl",
} as const satisfies TemperArmorTrait
