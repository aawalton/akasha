import type { WorldSkill } from "akasha/story/world-mechanic/world-skill/world-skill.page-type.types.ts"

export const falseMarvel = {
  id: "01a06575-980b-7915-b26e-6b0961978aaf",
  type: "world-skill",
  slug: "false-marvel",
  title: "False Marvel",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
