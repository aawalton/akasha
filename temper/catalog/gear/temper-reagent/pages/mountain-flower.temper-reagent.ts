import type { TemperReagent } from "akasha/temper/catalog/gear/temper-reagent/temper-reagent.page-type.types.ts"

export const mountainFlower = {
  id: "019e21f7-3b1e-73f9-ad0a-84d5d456442b",
  type: "page-type/temper-reagent",
  slug: "mountain-flower",
  title: "Mountain Flower",
  key: "mountain-flower",
  icon: "resources/mountain_flower_r1.png",
  itemId: 30163,
  alchemyEffects: [
    "temper-poison-effect/increase-armor",
    "temper-poison-effect/restore-health",
    "temper-poison-effect/maim",
    "temper-poison-effect/restore-stamina",
  ],
  createdAt: "2026-05-13T15:31:51.198Z",
  updatedAt: "2026-09-22T13:24:25.000Z",
} as const satisfies TemperReagent
