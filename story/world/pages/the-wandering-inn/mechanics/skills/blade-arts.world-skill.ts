import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const bladeArts = {
  id: "01a06575-97f5-7b52-a34b-8bc27b7a2174",
  type: "page-type/world-skill",
  slug: "blade-arts",
  title: "Blade Arts",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.565Z",
  updatedAt: "2026-09-22T13:31:40.000Z",
} as const satisfies WorldSkill
