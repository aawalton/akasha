import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const barrierOfFaith = {
  id: "01a06575-97f3-75af-a8f0-820d61ecfac0",
  type: "page-type/world-skill",
  slug: "barrier-of-faith",
  title: "Barrier of Faith",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.563Z",
  updatedAt: "2026-09-22T13:31:40.000Z",
} as const satisfies WorldSkill
