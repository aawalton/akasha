import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const challengeOfTheKnight = {
  id: "01a06575-97fa-747d-b5c7-c0ea30b8a428",
  type: "page-type/world-skill",
  slug: "challenge-of-the-knight",
  title: "Challenge of the Knight",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
