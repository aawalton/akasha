import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const foresight = {
  id: "01a06575-9810-7ede-9cd1-8bbeab6fd694",
  type: "page-type/world-skill",
  slug: "foresight",
  title: "Foresight",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
