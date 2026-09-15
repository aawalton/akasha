import type { WorldSkill } from "akasha/story/world-mechanic/world-skill/world-skill.page-type.types.ts"

export const extraNutritionMeat = {
  id: "01a06575-980a-705c-8f44-f7fb1694bafd",
  type: "world-skill",
  slug: "extra-nutrition-meat",
  title: "Extra Nutrition: Meat",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
