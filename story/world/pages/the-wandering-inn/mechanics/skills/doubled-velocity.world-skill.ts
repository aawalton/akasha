import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const doubledVelocity = {
  id: "01a06575-9805-790b-9407-7d7838e5538e",
  type: "page-type/world-skill",
  slug: "doubled-velocity",
  title: "Doubled Velocity",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.581Z",
  updatedAt: "2026-09-22T13:32:04.000Z",
} as const satisfies WorldSkill
