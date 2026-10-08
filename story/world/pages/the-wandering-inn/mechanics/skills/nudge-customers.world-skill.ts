import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const nudgeCustomers = {
  id: "01a0657d-027b-7492-9ea8-4e736ebc2b76",
  type: "page-type/world-skill",
  slug: "nudge-customers",
  title: "Nudge Customers",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:18:06.587Z",
  updatedAt: "2026-09-22T13:32:52.000Z",
} as const satisfies WorldSkill
