import type { TemperReagent } from "../temper-reagent.page-type.ts"

export const dragonRheum = {
  id: "01a05fd8-a452-7c52-a491-4a7e97e420e9",
  pageTypeSlug: "temper-reagent",
  slug: "dragon-rheum",
  title: "Dragon Rheum",
  key: "dragon-rheum",
  icon: "resources/dragonrheum.png",
  itemId: 150671,
  alchemyEffects: ["restore-magicka", "heroism", "enervation", "speed"],
} as const satisfies TemperReagent
