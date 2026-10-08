import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const drainDeathMana = {
  id: "01a06575-9805-70f6-bdb8-15596389e6e2",
  type: "page-type/world-skill",
  slug: "drain-death-mana",
  title: "Drain Death Mana",
  world: "world/the-wandering-inn",
  appearanceCount: 3,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.581Z",
  updatedAt: "2026-09-22T13:32:04.000Z",
} as const satisfies WorldSkill
