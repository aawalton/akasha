import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const immunityPain = {
  id: "01a06575-981d-7854-89d0-d025ae99581f",
  type: "world-skill",
  slug: "immunity-pain",
  title: "Immunity: Pain",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
