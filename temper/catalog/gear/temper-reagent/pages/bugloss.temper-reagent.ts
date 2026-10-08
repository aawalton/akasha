import type { TemperReagent } from "akasha/temper/catalog/gear/temper-reagent/temper-reagent.page-type.types.ts"

export const bugloss = {
  id: "019e21f7-3b08-742e-8c13-d4033e20e18a",
  type: "page-type/temper-reagent",
  slug: "bugloss",
  title: "Bugloss",
  key: "bugloss",
  icon: "resources/vipers_bugloss_r1.png",
  itemId: 30160,
  alchemyEffects: [
    "temper-poison-effect/increase-spell-resist",
    "temper-poison-effect/restore-health",
    "temper-poison-effect/cowardice",
    "temper-poison-effect/restore-magicka",
  ],
  createdAt: "2026-05-13T15:31:51.176Z",
  updatedAt: "2026-09-22T13:24:25.000Z",
} as const satisfies TemperReagent
