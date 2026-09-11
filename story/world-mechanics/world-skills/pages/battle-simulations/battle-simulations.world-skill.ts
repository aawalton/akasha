import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const battleSimulations = {
  id: "01a06575-97f4-7702-95f3-5c1a5e416374",
  type: "world-skill",
  slug: "battle-simulations",
  title: "Battle Simulations",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
