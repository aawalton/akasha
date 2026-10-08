import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const knightSChallenge = {
  id: "01a06575-9821-72eb-bfbc-0af70b90e8b4",
  type: "page-type/world-skill",
  slug: "knight-s-challenge",
  title: "Knight’s Challenge",
  world: "world/the-wandering-inn",
  appearanceCount: 4,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.609Z",
  updatedAt: "2026-09-22T13:32:35.000Z",
} as const satisfies WorldSkill
