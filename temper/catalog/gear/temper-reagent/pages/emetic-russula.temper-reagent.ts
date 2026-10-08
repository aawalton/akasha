import type { TemperReagent } from "akasha/temper/catalog/gear/temper-reagent/temper-reagent.page-type.types.ts"

export const emeticRussula = {
  id: "019e21f7-3b18-7e6e-835c-7568dfe11ec9",
  type: "page-type/temper-reagent",
  slug: "emetic-russula",
  title: "Emetic Russula",
  key: "emetic-russula",
  icon: "resources/emetic_russula_r1.png",
  itemId: 30151,
  alchemyEffects: [
    "temper-poison-effect/ravage-health",
    "temper-poison-effect/ravage-magicka",
    "temper-poison-effect/ravage-stamina",
    "temper-poison-effect/entrapment",
  ],
  createdAt: "2026-05-13T15:31:51.192Z",
  updatedAt: "2026-09-22T13:24:25.000Z",
} as const satisfies TemperReagent
