import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const catSGrace = {
  id: "01a06575-97fa-7b02-aadc-19198bd9bcb9",
  type: "page-type/world-skill",
  slug: "cat-s-grace",
  title: "Cat’s Grace",
  world: "world/the-wandering-inn",
  appearanceCount: 3,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.570Z",
  updatedAt: "2026-09-22T13:31:48.000Z",
} as const satisfies WorldSkill
