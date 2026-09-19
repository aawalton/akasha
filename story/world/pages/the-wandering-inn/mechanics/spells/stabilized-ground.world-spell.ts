import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const stabilizedGround = {
  id: "01a06572-95e2-749c-bede-aa8b63694ce1",
  type: "page-type/world-spell",
  slug: "stabilized-ground",
  title: "Stabilized Ground",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
