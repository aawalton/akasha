import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const foresightCommodities = {
  id: "01a06575-9810-7597-97c2-554ade63378d",
  type: "world-skill",
  slug: "foresight-commodities",
  title: "Foresight: Commodities",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
