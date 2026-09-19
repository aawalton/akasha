import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const continuousRolling = {
  id: "01a06575-97fd-7ea8-9fef-f2353a7be47e",
  type: "page-type/world-skill",
  slug: "continuous-rolling",
  title: "Continuous Rolling",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
