import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const gardens = {
  id: "01a06575-9814-7bbf-bf18-db73a6481c46",
  type: "page-type/world-skill",
  slug: "gardens",
  title: "Gardens",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.596Z",
  updatedAt: "2026-09-22T13:32:19.000Z",
} as const satisfies WorldSkill
