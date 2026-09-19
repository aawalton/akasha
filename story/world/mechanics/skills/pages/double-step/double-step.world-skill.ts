import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const doubleStep = {
  id: "01a06575-9805-7ab7-b4ac-2a2a6d1d22e3",
  type: "page-type/world-skill",
  slug: "double-step",
  title: "Double Step",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
