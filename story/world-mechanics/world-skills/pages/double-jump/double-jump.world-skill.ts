import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const doubleJump = {
  id: "01a06575-9805-750f-b14f-2a07e5866e54",
  type: "world-skill",
  slug: "double-jump",
  title: "Double Jump",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
