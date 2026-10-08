import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const leasedRoom = {
  id: "01a06575-9822-7804-b8f7-ca84c8ca4e15",
  type: "page-type/world-skill",
  slug: "leased-room",
  title: "Leased Room",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.610Z",
  updatedAt: "2026-09-22T13:32:35.000Z",
} as const satisfies WorldSkill
