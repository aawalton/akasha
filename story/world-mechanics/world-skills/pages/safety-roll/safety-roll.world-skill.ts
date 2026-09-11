import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const safetyRoll = {
  id: "01a0657d-02b7-7d6b-82c1-24756ab60ab9",
  type: "world-skill",
  slug: "safety-roll",
  title: "Safety Roll",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
