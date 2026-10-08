import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const challengeOfTheKnight = {
  id: "01a06575-97fa-747d-b5c7-c0ea30b8a428",
  type: "page-type/world-skill",
  slug: "challenge-of-the-knight",
  title: "Challenge of the Knight",
  world: "world/the-wandering-inn",
  appearanceCount: 3,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.570Z",
  updatedAt: "2026-09-22T13:31:48.000Z",
} as const satisfies WorldSkill
