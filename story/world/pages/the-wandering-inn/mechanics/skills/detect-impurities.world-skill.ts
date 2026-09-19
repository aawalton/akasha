import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const detectImpurities = {
  id: "01a06575-9803-7dfa-82bf-ee40386169c8",
  type: "page-type/world-skill",
  slug: "detect-impurities",
  title: "Detect Impurities",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
