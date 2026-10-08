import type { TemperReagent } from "akasha/temper/catalog/gear/temper-reagent/temper-reagent.page-type.types.ts"

export const dragonsBile = {
  id: "019e21f7-3b14-71cb-989c-b634ad936d67",
  type: "page-type/temper-reagent",
  slug: "dragons-bile",
  title: "Dragon's Bile",
  key: "dragons-bile",
  icon: "resources/dragonsbile.png",
  itemId: 150789,
  alchemyEffects: [
    "temper-poison-effect/heroism",
    "temper-poison-effect/vulnerability",
    "temper-poison-effect/invisible",
    "temper-poison-effect/vitality",
  ],
  createdAt: "2026-05-13T15:31:51.188Z",
  updatedAt: "2026-09-22T13:24:25.000Z",
} as const satisfies TemperReagent
