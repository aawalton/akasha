import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const quickReset = {
  id: "01a0657d-029b-7cff-bf16-18a74c8b9ddf",
  type: "page-type/world-skill",
  slug: "quick-reset",
  title: "Quick Reset",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
