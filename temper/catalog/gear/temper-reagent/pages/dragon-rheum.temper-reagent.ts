import type { TemperReagent } from "akasha/temper/catalog/gear/temper-reagent/temper-reagent.page-type.types.ts"

export const dragonRheum = {
  id: "019e21f7-3b16-7b50-8048-57cdd4919874",
  type: "page-type/temper-reagent",
  slug: "dragon-rheum",
  title: "Dragon Rheum",
  key: "dragon-rheum",
  icon: "resources/dragonrheum.png",
  itemId: 150671,
  alchemyEffects: [
    "temper-poison-effect/restore-magicka",
    "temper-poison-effect/heroism",
    "temper-poison-effect/enervation",
    "temper-poison-effect/speed",
  ],
} as const satisfies TemperReagent
