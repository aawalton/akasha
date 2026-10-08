import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const mudPit = {
  id: "01a06572-95d9-7b2e-bec4-9bf3175b67bd",
  type: "page-type/world-spell",
  slug: "mud-pit",
  title: "Mud Pit",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.417Z",
  updatedAt: "2026-09-22T13:34:49.000Z",
} as const satisfies WorldSpell
