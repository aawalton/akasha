import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const betLuck = {
  id: "01a06575-97f5-704f-b558-2ba2e01442f2",
  type: "world-skill",
  slug: "bet-luck",
  title: "Bet: Luck",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
