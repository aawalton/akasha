import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const flashUnsheathe = {
  id: "01a06575-980e-7a86-b11e-c26666e07d2c",
  type: "page-type/world-skill",
  slug: "flash-unsheathe",
  title: "Flash Unsheathe",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
