import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const magicTripwire = {
  id: "01a06572-95d1-7f0a-b623-8d2f23d5cbec",
  type: "page-type/world-spell",
  slug: "magic-tripwire",
  title: "Magic Tripwire",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.409Z",
  updatedAt: "2026-09-22T13:34:49.000Z",
} as const satisfies WorldSpell
