import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const flawlessStrike = {
  id: "01a06575-980e-768a-9822-fedb38fdba89",
  type: "world-skill",
  slug: "flawless-strike",
  title: "Flawless Strike",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
