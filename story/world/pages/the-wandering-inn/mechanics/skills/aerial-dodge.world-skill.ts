import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const aerialDodge = {
  id: "01a06575-97ea-7e71-8c07-cff83e8117a8",
  type: "page-type/world-skill",
  slug: "aerial-dodge",
  title: "Aerial Dodge",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.554Z",
  updatedAt: "2026-09-22T13:31:32.000Z",
} as const satisfies WorldSkill
