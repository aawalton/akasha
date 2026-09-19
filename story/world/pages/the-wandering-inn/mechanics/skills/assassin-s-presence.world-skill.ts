import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const assassinSPresence = {
  id: "01a06575-97ee-7168-95ee-12cfa649cb4a",
  type: "page-type/world-skill",
  slug: "assassin-s-presence",
  title: "Assassin’s Presence",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
