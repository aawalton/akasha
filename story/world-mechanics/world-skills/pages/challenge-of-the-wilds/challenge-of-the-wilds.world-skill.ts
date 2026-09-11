import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const challengeOfTheWilds = {
  id: "01a06575-97fa-7c21-8e5c-6ef0d05534a2",
  type: "world-skill",
  slug: "challenge-of-the-wilds",
  title: "Challenge of the Wilds",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
