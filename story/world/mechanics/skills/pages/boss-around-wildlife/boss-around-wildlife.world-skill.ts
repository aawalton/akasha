import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const bossAroundWildlife = {
  id: "01a06575-97f8-7d75-83fb-eb529e0e2722",
  type: "page-type/world-skill",
  slug: "boss-around-wildlife",
  title: "Boss Around Wildlife",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
