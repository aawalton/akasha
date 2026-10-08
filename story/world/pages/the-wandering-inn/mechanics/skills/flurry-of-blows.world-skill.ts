import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const flurryOfBlows = {
  id: "01a06575-980f-7493-827a-396445f41510",
  type: "page-type/world-skill",
  slug: "flurry-of-blows",
  title: "Flurry of Blows",
  world: "world/the-wandering-inn",
  appearanceCount: 4,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.591Z",
  updatedAt: "2026-09-22T13:32:12.000Z",
} as const satisfies WorldSkill
