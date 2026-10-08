import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const alcoholBrewing = {
  id: "01a06575-97ea-71e0-9035-5f125abfca3c",
  type: "page-type/world-skill",
  slug: "alcohol-brewing",
  title: "Alcohol Brewing",
  world: "world/the-wandering-inn",
  appearanceCount: 6,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.554Z",
  updatedAt: "2026-09-22T13:31:32.000Z",
} as const satisfies WorldSkill
