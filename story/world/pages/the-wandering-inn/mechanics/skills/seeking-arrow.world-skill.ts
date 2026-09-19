import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const seekingArrow = {
  id: "01a0657d-02b8-7d4e-bf7e-fa89a96b0852",
  type: "page-type/world-skill",
  slug: "seeking-arrow",
  title: "Seeking Arrow",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
