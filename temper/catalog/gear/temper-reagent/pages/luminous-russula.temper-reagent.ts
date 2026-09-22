import type { TemperReagent } from "akasha/temper/catalog/gear/temper-reagent/temper-reagent.page-type.types.ts"

export const luminousRussula = {
  id: "019e21f7-3b1d-7345-9a92-ca157efe1883",
  type: "page-type/temper-reagent",
  slug: "luminous-russula",
  title: "Luminous Russula",
  key: "luminous-russula",
  icon: "resources/luminous_russula_r1.png",
  itemId: 30155,
  alchemyEffects: [
    "temper-poison-effect/ravage-stamina",
    "temper-poison-effect/maim",
    "temper-poison-effect/restore-health",
    "temper-poison-effect/hindrance",
  ],
} as const satisfies TemperReagent
