import type { WorldSkill } from "akasha/story/world-mechanic/world-skill/world-skill.page-type.types.ts"

export const flamboyantDiveRoll = {
  id: "01a06575-980d-7d30-8b86-827103d3cdff",
  type: "world-skill",
  slug: "flamboyant-dive-roll",
  title: "Flamboyant Dive-roll",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
