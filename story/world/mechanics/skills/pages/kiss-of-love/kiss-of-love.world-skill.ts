import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const kissOfLove = {
  id: "01a06575-9821-7c2c-b4e2-25731e9eee5f",
  type: "page-type/world-skill",
  slug: "kiss-of-love",
  title: "Kiss of Love",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
