import type { TemperReagent } from "../temper-reagent.page-type.ts"

export const dragonsBlood = {
  id: "01a05fd8-a452-7ec5-84fe-908fc7eddb41",
  pageTypeSlug: "temper-reagent",
  slug: "dragons-blood",
  title: "Dragon's Blood",
  key: "dragons-blood",
  icon: "resources/dragonsblood.png",
  itemId: 150731,
  alchemyEffects: ["lingering-health", "restore-stamina", "heroism", "defile"],
} as const satisfies TemperReagent
