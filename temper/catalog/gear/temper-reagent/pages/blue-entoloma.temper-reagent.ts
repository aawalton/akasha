import type { TemperReagent } from "akasha/temper/catalog/gear/temper-reagent/temper-reagent.page-type.types.ts"

export const blueEntoloma = {
  id: "019e21f7-3b05-7e64-bbca-b537ab77410a",
  type: "page-type/temper-reagent",
  slug: "blue-entoloma",
  title: "Blue Entoloma",
  key: "blue-entoloma",
  icon: "resources/blue_entoloma_cap_r1.png",
  itemId: 30148,
  alchemyEffects: [
    "temper-poison-effect/ravage-magicka",
    "temper-poison-effect/cowardice",
    "temper-poison-effect/restore-health",
    "temper-poison-effect/invisible",
  ],
  createdAt: "2026-05-13T15:31:51.173Z",
  updatedAt: "2026-09-22T13:24:25.000Z",
} as const satisfies TemperReagent
