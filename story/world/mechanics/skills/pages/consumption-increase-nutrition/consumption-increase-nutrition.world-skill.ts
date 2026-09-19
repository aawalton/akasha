import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const consumptionIncreaseNutrition = {
  id: "01a06575-97fd-79cb-866c-145797459dff",
  type: "page-type/world-skill",
  slug: "consumption-increase-nutrition",
  title: "Consumption: Increase Nutrition",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
