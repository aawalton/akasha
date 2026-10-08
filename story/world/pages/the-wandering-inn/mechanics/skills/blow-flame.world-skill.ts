import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const blowFlame = {
  id: "01a06575-97f6-7c93-a28b-edfd689fefd6",
  type: "page-type/world-skill",
  slug: "blow-flame",
  title: "Blow Flame",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.566Z",
  updatedAt: "2026-09-22T13:31:40.000Z",
} as const satisfies WorldSkill
