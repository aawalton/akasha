import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const giveMeYourBest = {
  id: "01a06575-9815-7bd0-9087-44d91729ac9e",
  type: "page-type/world-skill",
  slug: "give-me-your-best",
  title: "Give Me Your Best",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.597Z",
  updatedAt: "2026-09-22T13:32:19.000Z",
} as const satisfies WorldSkill
