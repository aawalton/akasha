import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const doubleBackflip = {
  id: "01a06575-9805-7b5f-81e0-a6a3935539fe",
  type: "page-type/world-skill",
  slug: "double-backflip",
  title: "Double Backflip",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
