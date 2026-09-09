import type { WorldSkill } from "../../world-skill.page-type.ts"

export const leakCheck = {
  id: "01a06575-9822-780e-8ba5-75920f4bffda",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "leak-check",
  title: "Leak Check",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
