import type { TemperReagent } from "akasha/temper/catalog/gear/temper-reagent/temper-reagent.page-type.types.ts"

export const clamGall = {
  id: "019e21f7-3b0e-71af-9af1-3f3e0b61a2f2",
  type: "page-type/temper-reagent",
  slug: "clam-gall",
  title: "Clam Gall",
  key: "clam-gall",
  icon: "resources/reagent_clam_gall.png",
  itemId: 139020,
  alchemyEffects: [
    "temper-poison-effect/increase-spell-resist",
    "temper-poison-effect/hindrance",
    "temper-poison-effect/vulnerability",
    "temper-poison-effect/defile",
  ],
  createdAt: "2026-05-13T15:31:51.182Z",
  updatedAt: "2026-09-22T13:24:25.000Z",
} as const satisfies TemperReagent
