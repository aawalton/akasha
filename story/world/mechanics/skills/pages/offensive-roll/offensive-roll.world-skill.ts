import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const offensiveRoll = {
  id: "01a0657d-027b-77b0-b109-d8af4406abde",
  type: "page-type/world-skill",
  slug: "offensive-roll",
  title: "Offensive Roll",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
