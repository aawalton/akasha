import type { WorldSkill } from "akasha/story/world-mechanic/world-skill/world-skill.page-type.types.ts"

export const challengeOfTheKnight = {
  id: "01a06575-97fa-747d-b5c7-c0ea30b8a428",
  type: "world-skill",
  slug: "challenge-of-the-knight",
  title: "Challenge of the Knight",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
