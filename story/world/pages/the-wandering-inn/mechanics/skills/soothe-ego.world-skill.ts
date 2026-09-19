import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const sootheEgo = {
  id: "01a0657d-02c7-7dae-b00c-61cd8d1b4a4e",
  type: "page-type/world-skill",
  slug: "soothe-ego",
  title: "Soothe Ego",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
