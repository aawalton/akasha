import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const empoweredCasting = {
  id: "01a06575-9808-7944-b55f-bf99b1ffad1c",
  type: "page-type/world-skill",
  slug: "empowered-casting",
  title: "Empowered Casting",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.584Z",
  updatedAt: "2026-09-22T13:32:04.000Z",
} as const satisfies WorldSkill
