import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const greatSlash = {
  id: "01a06575-9816-7e3f-9f28-6bbde3cca87d",
  type: "page-type/world-skill",
  slug: "great-slash",
  title: "Great Slash",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.598Z",
  updatedAt: "2026-09-22T13:32:19.000Z",
} as const satisfies WorldSkill
