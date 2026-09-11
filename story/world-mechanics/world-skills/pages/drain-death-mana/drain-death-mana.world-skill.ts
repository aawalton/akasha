import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const drainDeathMana = {
  id: "01a06575-9805-70f6-bdb8-15596389e6e2",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "drain-death-mana",
  title: "Drain Death Mana",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
