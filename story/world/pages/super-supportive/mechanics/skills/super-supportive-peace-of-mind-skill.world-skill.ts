import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const superSupportivePeaceOfMindSkill = {
  id: "01a0e9f6-d518-7dd4-aa26-b63bd21106bc",
  type: "page-type/world-skill",
  slug: "super-supportive-peace-of-mind-skill",
  title: "Peace of Mind",
  world: "world/super-supportive",
  description: "A Chainer skill that lays a peace of mind on another person.",
} as const satisfies WorldSkill
