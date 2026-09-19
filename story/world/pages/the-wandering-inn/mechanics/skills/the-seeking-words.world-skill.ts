import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const theSeekingWords = {
  id: "01a0657d-0312-7c77-b117-277fb446d833",
  type: "page-type/world-skill",
  slug: "the-seeking-words",
  title: "The Seeking Words",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
