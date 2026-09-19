import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const formRanks = {
  id: "01a06575-9810-7d0d-ae66-bf3889fc4ff3",
  type: "page-type/world-skill",
  slug: "form-ranks",
  title: "Form Ranks",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
