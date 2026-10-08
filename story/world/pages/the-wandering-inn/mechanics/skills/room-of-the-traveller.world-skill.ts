import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const roomOfTheTraveller = {
  id: "01a0657d-02b6-7eaf-ba24-8dc55f03bc9c",
  type: "page-type/world-skill",
  slug: "room-of-the-traveller",
  title: "Room of the Traveller",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:18:06.646Z",
  updatedAt: "2026-09-22T13:33:09.000Z",
} as const satisfies WorldSkill
