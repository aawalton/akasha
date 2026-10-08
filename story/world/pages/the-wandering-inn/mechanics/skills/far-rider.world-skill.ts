import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const farRider = {
  id: "01a06575-980b-7659-b66a-d4eceaae050e",
  type: "page-type/world-skill",
  slug: "far-rider",
  title: "Far Rider",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.587Z",
  updatedAt: "2026-09-22T13:32:12.000Z",
} as const satisfies WorldSkill
