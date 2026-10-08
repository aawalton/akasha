import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const giveItToMe = {
  id: "01a06575-9815-7064-8a33-d1a4b33a23f9",
  type: "page-type/world-skill",
  slug: "give-it-to-me",
  title: "Give It To Me",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.597Z",
  updatedAt: "2026-09-22T13:32:19.000Z",
} as const satisfies WorldSkill
