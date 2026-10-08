import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const shieldWall = {
  id: "01a0657d-02c0-7092-8cf7-a03589727800",
  type: "page-type/world-skill",
  slug: "shield-wall",
  title: "Shield Wall",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:18:06.656Z",
  updatedAt: "2026-09-22T13:33:17.000Z",
} as const satisfies WorldSkill
