import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const evasiveDive = {
  id: "01a06575-9809-7db9-9184-9a3a2bdcfeae",
  type: "page-type/world-skill",
  slug: "evasive-dive",
  title: "Evasive Dive",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.585Z",
  updatedAt: "2026-09-22T13:32:12.000Z",
} as const satisfies WorldSkill
