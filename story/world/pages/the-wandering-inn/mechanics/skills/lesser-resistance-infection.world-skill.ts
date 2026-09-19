import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const lesserResistanceInfection = {
  id: "01a06575-9823-7346-aee3-e4cae780ad99",
  type: "page-type/world-skill",
  slug: "lesser-resistance-infection",
  title: "Lesser Resistance: Infection",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
