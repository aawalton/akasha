import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const archersTriplicateVolley = {
  id: "01a06575-97ec-76a8-9b1d-ad86e0f58909",
  type: "page-type/world-skill",
  slug: "archers-triplicate-volley",
  title: "Archers: Triplicate Volley",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.556Z",
  updatedAt: "2026-09-22T13:31:32.000Z",
} as const satisfies WorldSkill
