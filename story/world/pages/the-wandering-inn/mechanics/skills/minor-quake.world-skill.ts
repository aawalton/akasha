import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const minorQuake = {
  id: "01a0657d-024d-7e98-a225-76c84e0d0fcd",
  type: "page-type/world-skill",
  slug: "minor-quake",
  title: "Minor Quake",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:18:06.541Z",
  updatedAt: "2026-09-22T13:32:44.000Z",
} as const satisfies WorldSkill
