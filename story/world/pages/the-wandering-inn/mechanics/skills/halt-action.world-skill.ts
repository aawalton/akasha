import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const haltAction = {
  id: "01a06575-9818-75e8-9b4d-37b037beadd3",
  type: "page-type/world-skill",
  slug: "halt-action",
  title: "Halt Action",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.600Z",
  updatedAt: "2026-09-22T13:32:19.000Z",
} as const satisfies WorldSkill
