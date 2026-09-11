import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const detectImpurities = {
  id: "01a06575-9803-7dfa-82bf-ee40386169c8",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "detect-impurities",
  title: "Detect Impurities",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
