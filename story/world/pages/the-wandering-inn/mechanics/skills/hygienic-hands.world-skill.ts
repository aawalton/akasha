import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const hygienicHands = {
  id: "01a06575-981b-71d3-9c64-0d1a31d37529",
  type: "page-type/world-skill",
  slug: "hygienic-hands",
  title: "Hygienic Hands",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.603Z",
  updatedAt: "2026-09-22T13:32:27.000Z",
} as const satisfies WorldSkill
