import type { TemperReagent } from "akasha/temper/catalog/gear/temper-reagent/temper-reagent.page-type.types.ts"

export const columbine = {
  id: "019e21f7-3b0f-7979-8b5f-b4e6365d7863",
  type: "page-type/temper-reagent",
  slug: "columbine",
  title: "Columbine",
  key: "columbine",
  icon: "resources/columbine_r1.png",
  itemId: 30164,
  alchemyEffects: [
    "temper-poison-effect/restore-health",
    "temper-poison-effect/restore-magicka",
    "temper-poison-effect/restore-stamina",
    "temper-poison-effect/unstoppable",
  ],
  createdAt: "2026-05-13T15:31:51.183Z",
  updatedAt: "2026-09-22T13:24:25.000Z",
} as const satisfies TemperReagent
