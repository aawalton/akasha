import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const stabilizeCondition = {
  id: "01a0657d-02ee-7e03-9b51-3138f7ae14f2",
  type: "page-type/world-skill",
  slug: "stabilize-condition",
  title: "Stabilize Condition",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
