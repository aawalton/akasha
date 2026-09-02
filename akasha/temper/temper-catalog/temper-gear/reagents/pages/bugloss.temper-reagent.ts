import type { TemperReagent } from "../temper-reagent.page-type.ts"

export const bugloss = {
  id: "01a05fd8-a450-73e1-a618-647ca6d029a8",
  pageTypeSlug: "temper-reagent",
  slug: "bugloss",
  title: "Bugloss",
  key: "bugloss",
  icon: "resources/vipers_bugloss_r1.png",
  itemId: 30160,
  alchemyEffects: ["increase-spell-resist", "restore-health", "cowardice", "restore-magicka"],
} as const satisfies TemperReagent
