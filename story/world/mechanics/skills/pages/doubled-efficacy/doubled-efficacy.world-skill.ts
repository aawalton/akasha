import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const doubledEfficacy = {
  id: "01a06575-9805-7698-a71e-dd3e5b187e64",
  type: "page-type/world-skill",
  slug: "doubled-efficacy",
  title: "Doubled Efficacy",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
