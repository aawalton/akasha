import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const factualStatement = {
  id: "01a06575-980b-7bae-b633-aa5a4ef3ae4d",
  type: "page-type/world-skill",
  slug: "factual-statement",
  title: "Factual Statement",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
