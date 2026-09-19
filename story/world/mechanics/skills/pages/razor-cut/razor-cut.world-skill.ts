import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const razorCut = {
  id: "01a0657d-02a4-7135-9517-ae7cfa8b1b4c",
  type: "page-type/world-skill",
  slug: "razor-cut",
  title: "Razor Cut",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
