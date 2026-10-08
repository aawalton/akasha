import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const campfireChef = {
  id: "01a06575-97fa-77ef-9e5b-3f52b33d8add",
  type: "page-type/world-skill",
  slug: "campfire-chef",
  title: "Campfire Chef",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.570Z",
  updatedAt: "2026-09-22T13:31:48.000Z",
} as const satisfies WorldSkill
