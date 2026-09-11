import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const leasedRoom = {
  id: "01a06575-9822-7804-b8f7-ca84c8ca4e15",
  type: "world-skill",
  slug: "leased-room",
  title: "Leased Room",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
