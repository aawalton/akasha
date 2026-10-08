import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const dieForMe = {
  id: "01a06575-9803-74a4-93ab-d0605bd20973",
  type: "page-type/world-skill",
  slug: "die-for-me",
  title: "Die For Me",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.579Z",
  updatedAt: "2026-09-22T13:31:56.000Z",
} as const satisfies WorldSkill
