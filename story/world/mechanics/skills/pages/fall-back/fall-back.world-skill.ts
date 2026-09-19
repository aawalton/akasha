import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const fallBack = {
  id: "01a06575-980b-7a48-9971-9fe1c2d3ef2d",
  type: "page-type/world-skill",
  slug: "fall-back",
  title: "Fall Back",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
