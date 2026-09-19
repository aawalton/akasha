import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const theLawUpheld = {
  id: "01a0657d-0312-799f-b229-c774ba17d3b9",
  type: "page-type/world-skill",
  slug: "the-law-upheld",
  title: "The Law Upheld",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
