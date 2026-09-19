import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const auraDistantManipulation = {
  id: "01a06575-97ee-7b26-ba23-91518b7e0fd0",
  type: "page-type/world-skill",
  slug: "aura-distant-manipulation",
  title: "Aura: Distant Manipulation",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
