import type { TemperReagent } from "akasha/temper/catalog/gear/temper-reagent/temper-reagent.page-type.types.ts"

export const chaurusEgg = {
  id: "019e21f7-3b0c-7757-bdb2-01abe41fb21a",
  type: "page-type/temper-reagent",
  slug: "chaurus-egg",
  title: "Chaurus Egg",
  key: "chaurus-egg",
  icon: "resources/crafting_chaurus_eggs.png",
  itemId: 150669,
  alchemyEffects: [
    "temper-poison-effect/timidity",
    "temper-poison-effect/ravage-magicka",
    "temper-poison-effect/restore-stamina",
    "temper-poison-effect/detection",
  ],
} as const satisfies TemperReagent
