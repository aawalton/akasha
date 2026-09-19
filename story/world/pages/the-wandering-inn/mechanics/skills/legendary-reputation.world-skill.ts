import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const legendaryReputation = {
  id: "01a06575-9822-73be-99fc-ef964fb81d90",
  type: "page-type/world-skill",
  slug: "legendary-reputation",
  title: "Legendary Reputation",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
