import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const flashBaking = {
  id: "01a06575-980d-7d5b-be95-291487b89005",
  type: "page-type/world-skill",
  slug: "flash-baking",
  title: "Flash Baking",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
