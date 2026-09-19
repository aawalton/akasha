import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const markOfWorth = {
  id: "01a0657d-0243-77f2-af93-7ce4b9d3436e",
  type: "page-type/world-skill",
  slug: "mark-of-worth",
  title: "Mark of Worth",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
