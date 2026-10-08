import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const magicalCooking = {
  id: "01a0657d-0242-77bf-993b-aeecce142d27",
  type: "page-type/world-skill",
  slug: "magical-cooking",
  title: "Magical Cooking",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:18:06.530Z",
  updatedAt: "2026-09-22T13:32:44.000Z",
} as const satisfies WorldSkill
