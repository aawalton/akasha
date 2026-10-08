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
  createdAt: "2026-05-13T15:31:51.180Z",
  updatedAt: "2026-09-22T13:24:25.000Z",
} as const satisfies TemperReagent
