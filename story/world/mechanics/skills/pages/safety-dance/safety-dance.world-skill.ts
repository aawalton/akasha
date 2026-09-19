import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const safetyDance = {
  id: "01a0657d-02b7-7674-8377-4aaac3ebc8c6",
  type: "page-type/world-skill",
  slug: "safety-dance",
  title: "Safety Dance",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
