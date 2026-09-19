import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const confidentialSources = {
  id: "01a06575-97fc-71c2-82fd-581800ec5836",
  type: "page-type/world-skill",
  slug: "confidential-sources",
  title: "Confidential Sources",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
