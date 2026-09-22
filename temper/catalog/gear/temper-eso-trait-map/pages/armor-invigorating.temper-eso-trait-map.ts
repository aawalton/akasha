import type { TemperEsoTraitMap } from "akasha/temper/catalog/gear/temper-eso-trait-map/temper-eso-trait-map.page-type.types.ts"

export const armorInvigorating = {
  id: "01a05fd7-41c7-73f6-a823-abf5b03a126b",
  type: "page-type/temper-eso-trait-map",
  slug: "armor-invigorating",
  title: "Armor Invigorating",
  key: "armor:invigorating",
  traitFamily: "armor",
  traitId: "temper-armor-trait/invigorating",
  esoTraitNum: 17,
  displayOrder: 7,
} as const satisfies TemperEsoTraitMap
