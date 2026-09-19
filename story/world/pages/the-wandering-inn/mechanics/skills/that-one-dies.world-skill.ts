import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const thatOneDies = {
  id: "01a0657d-0311-7bc2-a282-f464ffdf30dd",
  type: "page-type/world-skill",
  slug: "that-one-dies",
  title: "That One Dies",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
