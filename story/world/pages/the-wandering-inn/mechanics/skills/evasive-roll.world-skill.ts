import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const evasiveRoll = {
  id: "01a06575-9809-7fa0-b9a2-ee8240028247",
  type: "page-type/world-skill",
  slug: "evasive-roll",
  title: "Evasive Roll",
  world: "world/the-wandering-inn",
  appearanceCount: 5,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.585Z",
  updatedAt: "2026-09-22T13:32:12.000Z",
} as const satisfies WorldSkill
