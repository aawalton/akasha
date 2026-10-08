import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const ceaseFire = {
  id: "01a06575-97fa-7fab-8a43-92201ac46402",
  type: "page-type/world-skill",
  slug: "cease-fire",
  title: "Cease Fire",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.570Z",
  updatedAt: "2026-09-22T13:31:48.000Z",
} as const satisfies WorldSkill
