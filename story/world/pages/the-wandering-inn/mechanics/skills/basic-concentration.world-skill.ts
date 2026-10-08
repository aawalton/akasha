import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const basicConcentration = {
  id: "01a06575-97f3-7c3e-b363-7bf7241c20fb",
  type: "page-type/world-skill",
  slug: "basic-concentration",
  title: "Basic Concentration",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.563Z",
  updatedAt: "2026-09-22T13:31:40.000Z",
} as const satisfies WorldSkill
