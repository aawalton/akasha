import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const nurturingMeal = {
  id: "01a0657d-027b-750d-afbd-30440e536501",
  type: "page-type/world-skill",
  slug: "nurturing-meal",
  title: "Nurturing Meal",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
