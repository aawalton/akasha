import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const accidentPrevention = {
  id: "01a06575-97e8-7a39-b13f-6e6b995ce2d6",
  type: "world-skill",
  slug: "accident-prevention",
  title: "Accident Prevention",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
