import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const doubleKick = {
  id: "01a06575-9805-7bec-89b2-ccbb4d4ea619",
  type: "page-type/world-skill",
  slug: "double-kick",
  title: "Double Kick",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
