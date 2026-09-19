import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const breadANutritionalMeal = {
  id: "01a06575-97f8-7ed9-9c10-f11298588406",
  type: "page-type/world-skill",
  slug: "bread-a-nutritional-meal",
  title: "Bread: A Nutritional Meal",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
