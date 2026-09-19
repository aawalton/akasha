import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const drainDeathMana = {
  id: "01a06575-9805-70f6-bdb8-15596389e6e2",
  type: "page-type/world-skill",
  slug: "drain-death-mana",
  title: "Drain Death Mana",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
