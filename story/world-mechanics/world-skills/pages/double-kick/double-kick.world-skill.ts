import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const doubleKick = {
  id: "01a06575-9805-7bec-89b2-ccbb4d4ea619",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "double-kick",
  title: "Double Kick",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
