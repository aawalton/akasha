import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const prayer = {
  id: "01a0657d-0296-7e29-a359-1e8d414cbb7d",
  type: "page-type/world-skill",
  slug: "prayer",
  title: "Prayer",
  world: "world/the-wandering-inn",
  appearanceCount: 3,
  references: "jsonl",
  createdAt: "2026-09-03T04:18:06.614Z",
  updatedAt: "2026-09-22T13:33:00.000Z",
} as const satisfies WorldSkill
