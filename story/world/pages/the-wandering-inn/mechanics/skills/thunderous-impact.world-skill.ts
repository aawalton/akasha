import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const thunderousImpact = {
  id: "01a0657d-0315-7647-9762-18e80ba742d1",
  type: "page-type/world-skill",
  slug: "thunderous-impact",
  title: "Thunderous Impact",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
