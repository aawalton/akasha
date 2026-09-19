import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const removeFoodPoisoning = {
  id: "01a0657d-02b0-77ef-9af4-8667e16f9b41",
  type: "page-type/world-skill",
  slug: "remove-food-poisoning",
  title: "Remove Food Poisoning",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
