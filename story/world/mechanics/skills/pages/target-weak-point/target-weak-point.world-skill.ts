import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const targetWeakPoint = {
  id: "01a0657d-0310-7a4b-af08-3d23085e64c6",
  type: "page-type/world-skill",
  slug: "target-weak-point",
  title: "Target Weak Point",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
