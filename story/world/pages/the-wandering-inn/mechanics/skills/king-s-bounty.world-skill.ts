import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const kingSBounty = {
  id: "01a06575-9821-7ec6-8685-84e06d534239",
  type: "page-type/world-skill",
  slug: "king-s-bounty",
  title: "King’s Bounty",
  world: "world/the-wandering-inn",
  appearanceCount: 3,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.609Z",
  updatedAt: "2026-09-22T13:32:35.000Z",
} as const satisfies WorldSkill
