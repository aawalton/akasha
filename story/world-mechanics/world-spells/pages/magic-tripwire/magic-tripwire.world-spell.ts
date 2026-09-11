import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const magicTripwire = {
  id: "01a06572-95d1-7f0a-b623-8d2f23d5cbec",
  type: "world-spell",
  slug: "magic-tripwire",
  title: "Magic Tripwire",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
