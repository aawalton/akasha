import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const teammateSideSkip = {
  id: "01a0657d-0311-7d5d-a40c-61de21ac1cd9",
  type: "page-type/world-skill",
  slug: "teammate-side-skip",
  title: "Teammate: Side Skip",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
