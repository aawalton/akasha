import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const hailOfArrows = {
  id: "01a06575-9818-76d2-bf34-beaeb935dc8b",
  type: "page-type/world-skill",
  slug: "hail-of-arrows",
  title: "Hail of Arrows",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.600Z",
  updatedAt: "2026-09-22T13:32:19.000Z",
} as const satisfies WorldSkill
