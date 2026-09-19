import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const roomOfTheTraveller = {
  id: "01a0657d-02b6-7eaf-ba24-8dc55f03bc9c",
  type: "page-type/world-skill",
  slug: "room-of-the-traveller",
  title: "Room of the Traveller",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
