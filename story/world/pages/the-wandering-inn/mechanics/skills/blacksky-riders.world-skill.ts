import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const blackskyRiders = {
  id: "01a06575-97f5-7d37-a002-8e4d94125b61",
  type: "page-type/world-skill",
  slug: "blacksky-riders",
  title: "Blacksky Riders",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
