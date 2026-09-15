import type { WorldSkill } from "akasha/story/world-mechanic/world-skill/world-skill.page-type.types.ts"

export const flawlessCut = {
  id: "01a06575-980e-7372-a513-36beb9785876",
  type: "world-skill",
  slug: "flawless-cut",
  title: "Flawless Cut",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
