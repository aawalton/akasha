import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const speedArrow = {
  id: "01a0657d-02ed-7784-8186-00c4945232dc",
  type: "page-type/world-skill",
  slug: "speed-arrow",
  title: "Speed Arrow",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
