import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const gracefulDodge = {
  id: "01a06575-9815-75c6-89f0-76d944e7cc06",
  type: "page-type/world-skill",
  slug: "graceful-dodge",
  title: "Graceful Dodge",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.597Z",
  updatedAt: "2026-09-22T13:32:19.000Z",
} as const satisfies WorldSkill
