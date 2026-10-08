import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const highJump = {
  id: "01a06575-981a-7eb4-be8d-59a0554396bd",
  type: "page-type/world-skill",
  slug: "high-jump",
  title: "High Jump",
  world: "world/the-wandering-inn",
  appearanceCount: 3,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.602Z",
  updatedAt: "2026-09-22T13:32:27.000Z",
} as const satisfies WorldSkill
