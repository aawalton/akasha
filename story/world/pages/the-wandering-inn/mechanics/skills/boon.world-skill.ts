import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const boon = {
  id: "01a06575-97f8-75b8-b4ff-498851e43c69",
  type: "page-type/world-skill",
  slug: "boon",
  title: "Boon",
  world: "world/the-wandering-inn",
  appearanceCount: 5,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.568Z",
  updatedAt: "2026-09-22T13:31:48.000Z",
} as const satisfies WorldSkill
