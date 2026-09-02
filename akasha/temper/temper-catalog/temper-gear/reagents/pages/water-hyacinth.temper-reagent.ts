import type { TemperReagent } from "../temper-reagent.page-type.ts"

export const waterHyacinth = {
  id: "01a05fd8-a458-7a00-8218-7f385e7a4c58",
  pageTypeSlug: "temper-reagent",
  slug: "water-hyacinth",
  title: "Water Hyacinth",
  key: "water-hyacinth",
  icon: "resources/plant_water_hyacinth_r1.png",
  itemId: 30166,
  alchemyEffects: ["restore-health", "spell-critical", "increase-weapon-crit", "entrapment"],
} as const satisfies TemperReagent
