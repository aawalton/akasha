import type { TemperEsoTraitMap } from "akasha/temper/catalog/gear/temper-eso-trait-map/temper-eso-trait-map.page-type.types.ts"

export const armorOrnate = {
  id: "01a05fd7-41c8-7675-a8af-e204933e3e1a",
  type: "page-type/temper-eso-trait-map",
  slug: "armor-ornate",
  title: "Armor Ornate",
  key: "armor:ornate",
  traitFamily: "armor",
  traitId: "temper-armor-trait/ornate",
  esoTraitNum: 19,
  displayOrder: 9,
} as const satisfies TemperEsoTraitMap
