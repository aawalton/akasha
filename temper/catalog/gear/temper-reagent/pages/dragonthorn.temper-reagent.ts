import type { TemperReagent } from "akasha/temper/catalog/gear/temper-reagent/temper-reagent.page-type.types.ts"

export const dragonthorn = {
  id: "019e21f7-3b17-7bda-9f80-d46932033b33",
  type: "page-type/temper-reagent",
  slug: "dragonthorn",
  title: "Dragonthorn",
  key: "dragonthorn",
  icon: "resources/dragonthorn.png",
  itemId: 30162,
  alchemyEffects: [
    "temper-poison-effect/increase-weapon-power",
    "temper-poison-effect/restore-stamina",
    "temper-poison-effect/fracture",
    "temper-poison-effect/increase-weapon-crit",
  ],
  createdAt: "2026-05-13T15:31:51.191Z",
  updatedAt: "2026-09-22T13:24:25.000Z",
} as const satisfies TemperReagent
