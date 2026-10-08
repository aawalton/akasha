import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const callForAid = {
  id: "01a06575-97f9-7891-98e2-9a6c9376d44e",
  type: "page-type/world-skill",
  slug: "call-for-aid",
  title: "Call for Aid",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.569Z",
  updatedAt: "2026-09-22T13:31:48.000Z",
} as const satisfies WorldSkill
