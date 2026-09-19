import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const lightningMelody = {
  id: "01a0657d-023f-7c1d-acb8-9a841d9cdfb9",
  type: "page-type/world-skill",
  slug: "lightning-melody",
  title: "Lightning Melody",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
