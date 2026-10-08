import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const boundSpellInvisibility = {
  id: "01a06572-95b7-7420-82ef-0f4346babfda",
  type: "page-type/world-spell",
  slug: "bound-spell-invisibility",
  title: "Bound Spell: Invisibility",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.383Z",
  updatedAt: "2026-09-22T13:34:16.000Z",
} as const satisfies WorldSpell
