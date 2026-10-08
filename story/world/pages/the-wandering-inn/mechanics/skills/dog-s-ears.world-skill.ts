import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const dogSEars = {
  id: "01a06575-9804-77eb-b70f-20839ceb2483",
  type: "page-type/world-skill",
  slug: "dog-s-ears",
  title: "Dog’s Ears",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.580Z",
  updatedAt: "2026-09-22T13:32:04.000Z",
} as const satisfies WorldSkill
