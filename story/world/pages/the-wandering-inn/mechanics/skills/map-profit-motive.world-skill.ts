import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const mapProfitMotive = {
  id: "01a0657d-0242-7ccc-91f0-8f68d3784f91",
  type: "page-type/world-skill",
  slug: "map-profit-motive",
  title: "Map Profit Motive",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
