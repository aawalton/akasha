import type { TemperReagent } from "akasha/temper/catalog/gear/temper-reagent/temper-reagent.page-type.types.ts"

export const dragonsBlood = {
  id: "019e21f7-3b15-7981-bc74-ec954096ea0c",
  type: "page-type/temper-reagent",
  slug: "dragons-blood",
  title: "Dragon's Blood",
  key: "dragons-blood",
  icon: "resources/dragonsblood.png",
  itemId: 150731,
  alchemyEffects: [
    "temper-poison-effect/lingering-health",
    "temper-poison-effect/restore-stamina",
    "temper-poison-effect/heroism",
    "temper-poison-effect/defile",
  ],
} as const satisfies TemperReagent
