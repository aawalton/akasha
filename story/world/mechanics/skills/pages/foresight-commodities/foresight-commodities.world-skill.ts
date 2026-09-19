import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const foresightCommodities = {
  id: "01a06575-9810-7597-97c2-554ade63378d",
  type: "page-type/world-skill",
  slug: "foresight-commodities",
  title: "Foresight: Commodities",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
