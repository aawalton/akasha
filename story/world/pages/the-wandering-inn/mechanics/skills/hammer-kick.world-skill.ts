import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const hammerKick = {
  id: "01a06575-9818-75f5-9a85-f3a4e8ad3e92",
  type: "page-type/world-skill",
  slug: "hammer-kick",
  title: "Hammer Kick",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.600Z",
  updatedAt: "2026-09-22T13:32:19.000Z",
} as const satisfies WorldSkill
