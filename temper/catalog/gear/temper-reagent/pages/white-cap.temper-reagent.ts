import type { TemperReagent } from "akasha/temper/catalog/gear/temper-reagent/temper-reagent.page-type.types.ts"

export const whiteCap = {
  id: "019e21f7-3b29-73cb-8b36-4fffb8b204f7",
  type: "page-type/temper-reagent",
  slug: "white-cap",
  title: "White Cap",
  key: "white-cap",
  icon: "resources/white_cap_r1.png",
  itemId: 30154,
  alchemyEffects: [
    "temper-poison-effect/cowardice",
    "temper-poison-effect/ravage-magicka",
    "temper-poison-effect/increase-spell-resist",
    "temper-poison-effect/detection",
  ],
} as const satisfies TemperReagent
