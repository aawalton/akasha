import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const flurryOfEfficiency = {
  id: "01a06575-980f-7923-aa36-6a369778e26f",
  type: "page-type/world-skill",
  slug: "flurry-of-efficiency",
  title: "Flurry of Efficiency",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
