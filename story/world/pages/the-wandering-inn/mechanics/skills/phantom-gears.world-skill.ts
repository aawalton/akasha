import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const phantomGears = {
  id: "01a0657d-0290-7c6f-96e1-64f21e8950b0",
  type: "page-type/world-skill",
  slug: "phantom-gears",
  title: "Phantom Gears",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:18:06.608Z",
  updatedAt: "2026-09-22T13:33:00.000Z",
} as const satisfies WorldSkill
