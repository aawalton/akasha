import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const ropeTrick = {
  id: "01a0657d-02b6-7fdf-be5a-3f26182b46c5",
  type: "page-type/world-skill",
  slug: "rope-trick",
  title: "Rope Trick",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
