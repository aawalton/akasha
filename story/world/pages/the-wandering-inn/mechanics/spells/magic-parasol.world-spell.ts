import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const magicParasol = {
  id: "01a06572-95d1-70c1-9908-b4ab6df4999c",
  type: "page-type/world-spell",
  slug: "magic-parasol",
  title: "Magic Parasol",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.409Z",
  updatedAt: "2026-09-22T13:34:41.000Z",
} as const satisfies WorldSpell
