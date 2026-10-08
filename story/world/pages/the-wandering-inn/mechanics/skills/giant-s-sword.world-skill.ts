import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const giantSSword = {
  id: "01a06575-9815-7274-bde4-5a26c8a522f8",
  type: "page-type/world-skill",
  slug: "giant-s-sword",
  title: "Giant’s Sword",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.597Z",
  updatedAt: "2026-09-22T13:32:19.000Z",
} as const satisfies WorldSkill
