import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const basicLeadership = {
  id: "01a06575-97f3-7e59-953a-a521b512f34a",
  type: "page-type/world-skill",
  slug: "basic-leadership",
  title: "Basic Leadership",
  world: "world/the-wandering-inn",
  appearanceCount: 3,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.563Z",
  updatedAt: "2026-09-22T13:31:40.000Z",
} as const satisfies WorldSkill
