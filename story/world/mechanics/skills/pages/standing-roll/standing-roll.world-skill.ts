import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const standingRoll = {
  id: "01a0657d-02ee-7d86-be74-816ca4c1ac09",
  type: "page-type/world-skill",
  slug: "standing-roll",
  title: "Standing Roll",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
