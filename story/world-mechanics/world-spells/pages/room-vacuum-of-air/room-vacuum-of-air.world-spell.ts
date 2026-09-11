import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const roomVacuumOfAir = {
  id: "01a06572-95de-75ad-bb81-205782954c2a",
  type: "world-spell",
  slug: "room-vacuum-of-air",
  title: "Room: Vacuum of Air",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
