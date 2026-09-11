import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const increasedStatGain = {
  id: "01a06575-981e-742c-b5ca-6fd926a6e819",
  type: "world-skill",
  slug: "increased-stat-gain",
  title: "Increased Stat Gain",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
