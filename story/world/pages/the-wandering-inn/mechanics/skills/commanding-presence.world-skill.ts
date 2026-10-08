import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const commandingPresence = {
  id: "01a06575-97fc-74a5-8c2c-e95cb9ee2c37",
  type: "page-type/world-skill",
  slug: "commanding-presence",
  title: "Commanding Presence",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.572Z",
  updatedAt: "2026-09-22T13:31:48.000Z",
} as const satisfies WorldSkill
