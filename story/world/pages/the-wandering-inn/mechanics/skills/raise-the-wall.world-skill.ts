import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const raiseTheWall = {
  id: "01a0657d-029c-7601-9c2b-18ba14b68ee7",
  type: "page-type/world-skill",
  slug: "raise-the-wall",
  title: "Raise the Wall",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:18:06.620Z",
  updatedAt: "2026-09-22T13:33:09.000Z",
} as const satisfies WorldSkill
