import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const inebriatedToughness = {
  id: "01a06575-981e-769b-9064-84fbd84d3c9c",
  type: "page-type/world-skill",
  slug: "inebriated-toughness",
  title: "Inebriated Toughness",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
