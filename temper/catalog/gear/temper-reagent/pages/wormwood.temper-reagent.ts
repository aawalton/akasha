import type { TemperReagent } from "akasha/temper/catalog/gear/temper-reagent/temper-reagent.page-type.types.ts"

export const wormwood = {
  id: "019e21f7-3b2a-714b-be75-0e5d4a48cf12",
  type: "page-type/temper-reagent",
  slug: "wormwood",
  title: "Wormwood",
  key: "wormwood",
  icon: "resources/wormwood_r1.png",
  itemId: 30159,
  alchemyEffects: [
    "temper-poison-effect/increase-weapon-crit",
    "temper-poison-effect/hindrance",
    "temper-poison-effect/detection",
    "temper-poison-effect/unstoppable",
  ],
} as const satisfies TemperReagent
