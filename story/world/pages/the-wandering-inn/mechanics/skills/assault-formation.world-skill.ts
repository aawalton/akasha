import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const assaultFormation = {
  id: "01a06575-97ee-716f-b96e-7966ef5bd4c1",
  type: "page-type/world-skill",
  slug: "assault-formation",
  title: "Assault Formation",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.558Z",
  updatedAt: "2026-09-22T13:31:40.000Z",
} as const satisfies WorldSkill
