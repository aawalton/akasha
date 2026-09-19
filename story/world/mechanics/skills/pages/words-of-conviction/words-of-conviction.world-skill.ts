import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const wordsOfConviction = {
  id: "01a0657d-0337-7165-a6c6-b54d3ee5a009",
  type: "page-type/world-skill",
  slug: "words-of-conviction",
  title: "Words of Conviction",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
