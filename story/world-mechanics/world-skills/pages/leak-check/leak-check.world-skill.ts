import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const leakCheck = {
  id: "01a06575-9822-780e-8ba5-75920f4bffda",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "leak-check",
  title: "Leak Check",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
