import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const evasiveDodge = {
  id: "01a06575-9809-71c2-b48c-3c891b4fd021",
  type: "page-type/world-skill",
  slug: "evasive-dodge",
  title: "Evasive Dodge",
  world: "world/the-wandering-inn",
  appearanceCount: 4,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.585Z",
  updatedAt: "2026-09-22T13:32:12.000Z",
} as const satisfies WorldSkill
