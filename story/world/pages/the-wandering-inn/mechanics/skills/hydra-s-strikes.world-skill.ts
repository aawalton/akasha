import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const hydraSStrikes = {
  id: "01a06575-981b-7521-a216-075dc6795a3a",
  type: "page-type/world-skill",
  slug: "hydra-s-strikes",
  title: "Hydra’s Strikes",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
