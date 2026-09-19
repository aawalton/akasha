import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const aerialBoost = {
  id: "01a06575-97ea-73d1-9b97-b3997250d810",
  type: "page-type/world-skill",
  slug: "aerial-boost",
  title: "Aerial Boost",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
