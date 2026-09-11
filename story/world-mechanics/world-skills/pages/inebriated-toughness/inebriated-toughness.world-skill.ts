import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const inebriatedToughness = {
  id: "01a06575-981e-769b-9064-84fbd84d3c9c",
  type: "world-skill",
  slug: "inebriated-toughness",
  title: "Inebriated Toughness",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
