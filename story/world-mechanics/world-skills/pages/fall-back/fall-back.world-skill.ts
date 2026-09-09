import type { WorldSkill } from "../../world-skill.page-type.ts"

export const fallBack = {
  id: "01a06575-980b-7a48-9971-9fe1c2d3ef2d",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "fall-back",
  title: "Fall Back",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
