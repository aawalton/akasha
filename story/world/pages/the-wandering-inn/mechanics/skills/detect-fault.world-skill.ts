import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const detectFault = {
  id: "01a06575-9803-7216-affd-3ec668ebb960",
  type: "page-type/world-skill",
  slug: "detect-fault",
  title: "Detect Fault",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.579Z",
  updatedAt: "2026-09-22T13:31:56.000Z",
} as const satisfies WorldSkill
