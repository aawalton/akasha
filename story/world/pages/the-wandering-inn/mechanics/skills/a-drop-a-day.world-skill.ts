import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const aDropADay = {
  id: "01a06575-97e7-7b0b-aeb5-fa0c55297b60",
  type: "page-type/world-skill",
  slug: "a-drop-a-day",
  title: "A Drop A Day",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.551Z",
  updatedAt: "2026-09-22T13:31:32.000Z",
} as const satisfies WorldSkill
