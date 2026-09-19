import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const battalionOfGlory = {
  id: "01a06575-97f4-7d09-8b5d-71861422bb5a",
  type: "page-type/world-skill",
  slug: "battalion-of-glory",
  title: "Battalion of Glory",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
