import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const takeCover = {
  id: "01a0657d-0307-70a1-8901-333c32a6b1b3",
  type: "page-type/world-skill",
  slug: "take-cover",
  title: "Take Cover",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:18:06.727Z",
  updatedAt: "2026-09-22T13:33:34.000Z",
} as const satisfies WorldSkill
