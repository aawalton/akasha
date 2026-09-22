import type { TemperReagent } from "akasha/temper/catalog/gear/temper-reagent/temper-reagent.page-type.types.ts"

export const crimsonNirnroot = {
  id: "019e21f7-3b12-7958-836d-1cf8db4411cb",
  type: "page-type/temper-reagent",
  slug: "crimson-nirnroot",
  title: "Crimson Nirnroot",
  key: "crimson-nirnroot",
  icon: "resources/crafting_water_plant_nirnroot_crimson.png",
  itemId: 150672,
  alchemyEffects: [
    "temper-poison-effect/timidity",
    "temper-poison-effect/spell-critical",
    "temper-poison-effect/gradual-ravage-health",
    "temper-poison-effect/restore-health",
  ],
} as const satisfies TemperReagent
