import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const kissOfTheViper = {
  id: "01a06575-9821-7d85-a38c-158ce20bced9",
  type: "page-type/world-skill",
  slug: "kiss-of-the-viper",
  title: "Kiss of the Viper",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
