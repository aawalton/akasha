import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const conjureDrinkOfTheDay = {
  id: "01a06575-97fc-7fce-90a6-3ee05b285236",
  type: "world-skill",
  slug: "conjure-drink-of-the-day",
  title: "Conjure: Drink of the Day",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
