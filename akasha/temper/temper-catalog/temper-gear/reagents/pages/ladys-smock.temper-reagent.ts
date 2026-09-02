import type { TemperReagent } from "../temper-reagent.page-type.ts"

export const ladysSmock = {
  id: "01a05fd8-a454-7e6a-99be-ea71af906972",
  pageTypeSlug: "temper-reagent",
  slug: "ladys-smock",
  title: "Lady's Smock",
  key: "ladys-smock",
  icon: "resources/ladysmock.png",
  itemId: 30158,
  alchemyEffects: ["increase-spell-power", "restore-magicka", "breach", "spell-critical"],
} as const satisfies TemperReagent
