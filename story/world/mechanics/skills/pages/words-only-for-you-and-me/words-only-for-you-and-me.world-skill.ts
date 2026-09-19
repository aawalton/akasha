import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const wordsOnlyForYouAndMe = {
  id: "01a0657d-0337-7736-ba75-ada8b397990c",
  type: "page-type/world-skill",
  slug: "words-only-for-you-and-me",
  title: "Words Only For You and Me",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
