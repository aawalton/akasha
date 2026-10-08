import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const manaShield = {
  id: "01a0657d-0242-721e-9fba-0fd304ed4731",
  type: "page-type/world-skill",
  slug: "mana-shield",
  title: "Mana Shield",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:18:06.530Z",
  updatedAt: "2026-09-22T13:32:44.000Z",
} as const satisfies WorldSkill
