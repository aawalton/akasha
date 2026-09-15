import type { WorldSkill } from "akasha/story/world-mechanic/world-skill/world-skill.page-type.types.ts"

export const iChallengeYou = {
  id: "01a06575-981b-7478-843f-6ccec863650e",
  type: "world-skill",
  slug: "i-challenge-you",
  title: "I Challenge You",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
