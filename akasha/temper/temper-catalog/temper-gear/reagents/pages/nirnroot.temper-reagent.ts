import type { TemperReagent } from "../temper-reagent.page-type.ts"

export const nirnroot = {
  id: "01a05fd8-a455-7625-b1fd-7fae5edc6646",
  pageTypeSlug: "temper-reagent",
  slug: "nirnroot",
  title: "Nirnroot",
  key: "nirnroot",
  icon: "resources/plant_nirnroot_r1.png",
  itemId: 30165,
  alchemyEffects: ["ravage-health", "uncertainty", "enervation", "invisible"],
} as const satisfies TemperReagent
