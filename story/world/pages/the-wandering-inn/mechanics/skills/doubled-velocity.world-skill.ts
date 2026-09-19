import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const doubledVelocity = {
  id: "01a06575-9805-790b-9407-7d7838e5538e",
  type: "page-type/world-skill",
  slug: "doubled-velocity",
  title: "Doubled Velocity",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
