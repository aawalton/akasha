import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const wateryFloor = {
  id: "01a06572-95e9-7588-9e3d-2c994946f982",
  type: "world-spell",
  slug: "watery-floor",
  title: "Watery Floor",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
