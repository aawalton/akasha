import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const arcaneToughness = {
  id: "01a06575-97ec-75df-944b-8f8555df7ad7",
  type: "page-type/world-skill",
  slug: "arcane-toughness",
  title: "Arcane Toughness",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.556Z",
  updatedAt: "2026-09-22T13:31:32.000Z",
} as const satisfies WorldSkill
