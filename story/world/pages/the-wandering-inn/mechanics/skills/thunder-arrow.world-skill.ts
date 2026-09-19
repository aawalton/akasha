import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const thunderArrow = {
  id: "01a0657d-0315-7cdb-a6f3-8610ff5fae9b",
  type: "page-type/world-skill",
  slug: "thunder-arrow",
  title: "Thunder Arrow",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
