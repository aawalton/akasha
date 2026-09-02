import type { TemperReagent } from "../temper-reagent.page-type.ts"

export const blueEntoloma = {
  id: "01a05fd8-a44f-73ff-83a7-6fea366c78e0",
  pageTypeSlug: "temper-reagent",
  slug: "blue-entoloma",
  title: "Blue Entoloma",
  key: "blue-entoloma",
  icon: "resources/blue_entoloma_cap_r1.png",
  itemId: 30148,
  alchemyEffects: ["ravage-magicka", "cowardice", "restore-health", "invisible"],
} as const satisfies TemperReagent
