import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const blessingOfRains = {
  id: "01a06575-97f6-7d68-aadc-34938421e12c",
  type: "page-type/world-skill",
  slug: "blessing-of-rains",
  title: "Blessing of Rains",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.566Z",
  updatedAt: "2026-09-22T13:31:40.000Z",
} as const satisfies WorldSkill
