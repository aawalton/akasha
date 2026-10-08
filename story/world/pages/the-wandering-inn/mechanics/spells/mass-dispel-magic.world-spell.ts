import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const massDispelMagic = {
  id: "01a06572-95d1-790b-9778-68240f701125",
  type: "page-type/world-spell",
  slug: "mass-dispel-magic",
  title: "Mass Dispel Magic",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.409Z",
  updatedAt: "2026-09-22T13:34:49.000Z",
} as const satisfies WorldSpell
