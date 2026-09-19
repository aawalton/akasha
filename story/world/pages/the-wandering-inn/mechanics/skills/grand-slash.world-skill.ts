import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const grandSlash = {
  id: "01a06575-9816-7d67-907e-7ccc27cb3993",
  type: "page-type/world-skill",
  slug: "grand-slash",
  title: "Grand Slash",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
