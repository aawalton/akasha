import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const immobileRanks = {
  id: "01a06575-981c-7696-8c4d-966df44d7a47",
  type: "page-type/world-skill",
  slug: "immobile-ranks",
  title: "Immobile Ranks",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
