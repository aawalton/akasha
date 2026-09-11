import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const roomOfWeightlessness = {
  id: "01a06572-95de-73e2-9839-b2fa66d1a4de",
  type: "world-spell",
  slug: "room-of-weightlessness",
  title: "Room of Weightlessness",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
