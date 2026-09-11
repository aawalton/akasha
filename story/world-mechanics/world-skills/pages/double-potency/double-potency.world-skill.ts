import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const doublePotency = {
  id: "01a06575-9805-74cf-9da3-78dbd7feb176",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "double-potency",
  title: "Double Potency",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
