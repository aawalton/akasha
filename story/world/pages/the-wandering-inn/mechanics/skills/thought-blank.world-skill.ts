import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const thoughtBlank = {
  id: "01a0657d-0315-78de-8914-c776a21479e9",
  type: "page-type/world-skill",
  slug: "thought-blank",
  title: "Thought Blank",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
