import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const didYouUnderstandThat = {
  id: "01a06575-9803-7d60-a35e-32804415d498",
  type: "page-type/world-skill",
  slug: "did-you-understand-that",
  title: "Did You Understand That?",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
