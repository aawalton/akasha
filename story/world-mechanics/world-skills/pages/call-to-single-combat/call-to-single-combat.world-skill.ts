import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const callToSingleCombat = {
  id: "01a06575-97fa-7265-84a5-8b4360157374",
  type: "world-skill",
  slug: "call-to-single-combat",
  title: "Call to Single Combat",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
