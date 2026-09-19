import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const recallBlade = {
  id: "01a0657d-02a5-7532-9d6b-8d2eb1ce5327",
  type: "page-type/world-skill",
  slug: "recall-blade",
  title: "Recall Blade",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
