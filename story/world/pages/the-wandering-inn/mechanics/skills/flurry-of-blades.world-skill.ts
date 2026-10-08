import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const flurryOfBlades = {
  id: "01a06575-980f-7020-9f88-11271ecfefd6",
  type: "page-type/world-skill",
  slug: "flurry-of-blades",
  title: "Flurry of Blades",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.591Z",
  updatedAt: "2026-09-22T13:32:12.000Z",
} as const satisfies WorldSkill
