import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const resistancePoison = {
  id: "01a0657d-02b1-7729-9b13-960980783b44",
  type: "world-skill",
  slug: "resistance-poison",
  title: "Resistance: Poison",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
