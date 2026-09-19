import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const grandRitual = {
  id: "01a06575-9816-74f9-a5a6-aface8b4c9bb",
  type: "page-type/world-skill",
  slug: "grand-ritual",
  title: "Grand Ritual",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
