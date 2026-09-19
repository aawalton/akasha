import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const heatedRoom = {
  id: "01a06572-95c8-7ea6-b89e-ab70140aaf8b",
  type: "page-type/world-spell",
  slug: "heated-room",
  title: "Heated Room",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
