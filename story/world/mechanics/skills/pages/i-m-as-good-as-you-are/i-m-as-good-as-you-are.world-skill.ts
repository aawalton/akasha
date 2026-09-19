import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const iMAsGoodAsYouAre = {
  id: "01a06575-981c-7bc0-a7ad-cdcb728b3993",
  type: "page-type/world-skill",
  slug: "i-m-as-good-as-you-are",
  title: "I’m As Good As You Are",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
