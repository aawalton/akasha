import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const farstepInterception = {
  id: "01a06575-980b-7317-a5ae-4cdf0f12b7b9",
  type: "page-type/world-skill",
  slug: "farstep-interception",
  title: "Farstep Interception",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
