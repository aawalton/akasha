import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const quakeBlade = {
  id: "01a0657d-029a-77e4-8976-2a9448ad3ebc",
  type: "page-type/world-skill",
  slug: "quake-blade",
  title: "Quake Blade",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:18:06.618Z",
  updatedAt: "2026-09-22T13:33:00.000Z",
} as const satisfies WorldSkill
