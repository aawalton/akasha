import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const perfectCut = {
  id: "01a0657d-028f-74f7-a6af-a3cf2fb351ee",
  type: "page-type/world-skill",
  slug: "perfect-cut",
  title: "Perfect Cut",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
