import type { TemperReagent } from "akasha/temper/catalog/gear/temper-reagent/temper-reagent.page-type.types.ts"

export const scribJelly = {
  id: "019e21f7-3b23-76fd-9ebe-76673440b3b9",
  type: "page-type/temper-reagent",
  slug: "scrib-jelly",
  title: "Scrib Jelly",
  key: "scrib-jelly",
  icon: "resources/reagent_scrib_jelly.png",
  itemId: 77589,
  alchemyEffects: [
    "temper-poison-effect/ravage-magicka",
    "temper-poison-effect/speed",
    "temper-poison-effect/vulnerability",
    "temper-poison-effect/lingering-health",
  ],
} as const satisfies TemperReagent
