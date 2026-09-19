import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const gigantSSword = {
  id: "01a06575-9815-73df-89bb-637dbc250320",
  type: "page-type/world-skill",
  slug: "gigant-s-sword",
  title: "Gigant’s Sword",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
