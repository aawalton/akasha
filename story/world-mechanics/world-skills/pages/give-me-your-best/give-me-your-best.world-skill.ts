import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const giveMeYourBest = {
  id: "01a06575-9815-7bd0-9087-44d91729ac9e",
  type: "world-skill",
  slug: "give-me-your-best",
  title: "Give Me Your Best",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
