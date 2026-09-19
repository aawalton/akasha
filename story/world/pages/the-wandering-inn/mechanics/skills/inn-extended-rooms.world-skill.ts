import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const innExtendedRooms = {
  id: "01a06575-981e-7afb-b5c9-be18d51791e6",
  type: "page-type/world-skill",
  slug: "inn-extended-rooms",
  title: "Inn: Extended Rooms",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
