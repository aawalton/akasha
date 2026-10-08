import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const quickStrike = {
  id: "01a0657d-029b-768f-8bce-f2e7f6d7893b",
  type: "page-type/world-skill",
  slug: "quick-strike",
  title: "Quick Strike",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:18:06.619Z",
  updatedAt: "2026-09-22T13:33:00.000Z",
} as const satisfies WorldSkill
