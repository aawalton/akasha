import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const noAirResistance = {
  id: "01a0657d-027b-71fd-8360-fe989996218d",
  type: "world-skill",
  slug: "no-air-resistance",
  title: "No Air Resistance",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
