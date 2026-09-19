import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const doublePotency = {
  id: "01a06575-9805-74cf-9da3-78dbd7feb176",
  type: "page-type/world-skill",
  slug: "double-potency",
  title: "Double Potency",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
