import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const aircraftHighImpactRounds = {
  id: "01a06575-97ea-7736-8da9-3759044b6384",
  type: "page-type/world-skill",
  slug: "aircraft-high-impact-rounds",
  title: "Aircraft: High Impact Rounds",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
