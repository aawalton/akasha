import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const repairBooks = {
  id: "01a0657d-02b0-7b66-95ba-70a9c1676f64",
  type: "world-skill",
  slug: "repair-books",
  title: "Repair Books",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
