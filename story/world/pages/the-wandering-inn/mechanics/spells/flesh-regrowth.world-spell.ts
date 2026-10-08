import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const fleshRegrowth = {
  id: "01a06572-95c4-7177-89e1-552ce1885daf",
  type: "page-type/world-spell",
  slug: "flesh-regrowth",
  title: "Flesh Regrowth",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.396Z",
  updatedAt: "2026-09-22T13:34:32.000Z",
} as const satisfies WorldSpell
