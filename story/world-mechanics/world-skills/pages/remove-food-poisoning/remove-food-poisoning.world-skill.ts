import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const removeFoodPoisoning = {
  id: "01a0657d-02b0-77ef-9af4-8667e16f9b41",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "remove-food-poisoning",
  title: "Remove Food Poisoning",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
