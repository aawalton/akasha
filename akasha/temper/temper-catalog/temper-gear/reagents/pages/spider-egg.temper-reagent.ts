import type { TemperReagent } from "../temper-reagent.page-type.ts"

export const spiderEgg = {
  id: "01a05fd8-a456-7360-a474-a6cce8cc8fd5",
  pageTypeSlug: "temper-reagent",
  slug: "spider-egg",
  title: "Spider Egg",
  key: "spider-egg",
  icon: "resources/reagent_spider_egg.png",
  itemId: 77584,
  alchemyEffects: ["hindrance", "invisible", "lingering-health", "defile"],
} as const satisfies TemperReagent
