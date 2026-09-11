import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const greatSlash = {
  id: "01a06575-9816-7e3f-9f28-6bbde3cca87d",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "great-slash",
  title: "Great Slash",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
