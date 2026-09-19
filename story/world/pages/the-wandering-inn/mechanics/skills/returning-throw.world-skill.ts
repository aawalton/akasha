import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const returningThrow = {
  id: "01a0657d-02b1-7ec7-82e2-b3dce9730079",
  type: "page-type/world-skill",
  slug: "returning-throw",
  title: "Returning Throw",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
