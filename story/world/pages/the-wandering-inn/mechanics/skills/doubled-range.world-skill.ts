import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const doubledRange = {
  id: "01a06575-9805-7a7e-946f-7d05ab68e0f7",
  type: "page-type/world-skill",
  slug: "doubled-range",
  title: "Doubled Range",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.581Z",
  updatedAt: "2026-09-22T13:32:04.000Z",
} as const satisfies WorldSkill
