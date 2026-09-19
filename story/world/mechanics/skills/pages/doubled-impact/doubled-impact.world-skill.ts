import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const doubledImpact = {
  id: "01a06575-9805-7e5a-b171-2c6da1ae5983",
  type: "page-type/world-skill",
  slug: "doubled-impact",
  title: "Doubled Impact",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
