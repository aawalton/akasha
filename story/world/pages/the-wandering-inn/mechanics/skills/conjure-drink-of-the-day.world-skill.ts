import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const conjureDrinkOfTheDay = {
  id: "01a06575-97fc-7fce-90a6-3ee05b285236",
  type: "page-type/world-skill",
  slug: "conjure-drink-of-the-day",
  title: "Conjure: Drink of the Day",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
