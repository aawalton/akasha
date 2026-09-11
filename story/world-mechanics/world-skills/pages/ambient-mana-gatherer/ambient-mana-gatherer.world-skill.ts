import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const ambientManaGatherer = {
  id: "01a06575-97eb-7c5e-bf14-e1afb8702c23",
  type: "world-skill",
  slug: "ambient-mana-gatherer",
  title: "Ambient Mana Gatherer",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
