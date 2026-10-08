import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const evasiveLeap = {
  id: "01a06575-9809-7201-9bef-2e2674dd3cc9",
  type: "page-type/world-skill",
  slug: "evasive-leap",
  title: "Evasive Leap",
  world: "world/the-wandering-inn",
  appearanceCount: 6,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.585Z",
  updatedAt: "2026-09-22T13:32:12.000Z",
} as const satisfies WorldSkill
