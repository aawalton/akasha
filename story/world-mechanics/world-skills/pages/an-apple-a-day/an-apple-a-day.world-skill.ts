import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const anAppleADay = {
  id: "01a06575-97eb-7d34-9f5e-c5a29ea7e42a",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "an-apple-a-day",
  title: "An Apple A Day",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
