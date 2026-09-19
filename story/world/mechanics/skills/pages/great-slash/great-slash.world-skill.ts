import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const greatSlash = {
  id: "01a06575-9816-7e3f-9f28-6bbde3cca87d",
  type: "page-type/world-skill",
  slug: "great-slash",
  title: "Great Slash",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
