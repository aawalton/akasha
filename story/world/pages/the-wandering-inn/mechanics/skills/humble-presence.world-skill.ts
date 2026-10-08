import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const humblePresence = {
  id: "01a06575-981b-78a8-8f61-d6144b084497",
  type: "page-type/world-skill",
  slug: "humble-presence",
  title: "Humble Presence",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.603Z",
  updatedAt: "2026-09-22T13:32:27.000Z",
} as const satisfies WorldSkill
