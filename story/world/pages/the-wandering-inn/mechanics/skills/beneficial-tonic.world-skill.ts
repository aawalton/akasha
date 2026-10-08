import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const beneficialTonic = {
  id: "01a06575-97f5-7b36-8e0e-a7f5da896496",
  type: "page-type/world-skill",
  slug: "beneficial-tonic",
  title: "Beneficial Tonic",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.565Z",
  updatedAt: "2026-09-22T13:31:40.000Z",
} as const satisfies WorldSkill
