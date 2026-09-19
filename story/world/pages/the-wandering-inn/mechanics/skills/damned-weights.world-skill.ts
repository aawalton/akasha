import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const damnedWeights = {
  id: "01a06575-9800-7860-9b7c-4d4a7a61b018",
  type: "page-type/world-skill",
  slug: "damned-weights",
  title: "Damned Weights",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
