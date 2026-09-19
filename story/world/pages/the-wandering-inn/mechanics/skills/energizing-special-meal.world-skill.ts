import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const energizingSpecialMeal = {
  id: "01a06575-9808-7add-94a5-d61153d6ac33",
  type: "page-type/world-skill",
  slug: "energizing-special-meal",
  title: "Energizing Special Meal",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
