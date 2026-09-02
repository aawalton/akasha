import type { TemperReagent } from "../temper-reagent.page-type.ts"

export const crimsonNirnroot = {
  id: "01a05fd8-a451-7cd9-8a7a-bb9f7059bc49",
  pageTypeSlug: "temper-reagent",
  slug: "crimson-nirnroot",
  title: "Crimson Nirnroot",
  key: "crimson-nirnroot",
  icon: "resources/crafting_water_plant_nirnroot_crimson.png",
  itemId: 150672,
  alchemyEffects: ["timidity", "spell-critical", "gradual-ravage-health", "restore-health"],
} as const satisfies TemperReagent
