import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const betLuck = {
  id: "01a06575-97f5-704f-b558-2ba2e01442f2",
  type: "page-type/world-skill",
  slug: "bet-luck",
  title: "Bet: Luck",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.565Z",
  updatedAt: "2026-09-22T13:31:40.000Z",
} as const satisfies WorldSkill
