import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const magicPoke = {
  id: "01a06572-95d1-7915-8612-dec39b491187",
  type: "page-type/world-spell",
  slug: "magic-poke",
  title: "Magic Poke",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.409Z",
  updatedAt: "2026-09-22T13:34:41.000Z",
} as const satisfies WorldSpell
