import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const increasedStatGain = {
  id: "01a06575-981e-742c-b5ca-6fd926a6e819",
  type: "page-type/world-skill",
  slug: "increased-stat-gain",
  title: "Increased Stat Gain",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.606Z",
  updatedAt: "2026-09-22T13:32:27.000Z",
} as const satisfies WorldSkill
