import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const noxiousFumes = {
  id: "01a06572-95d9-7e6c-9896-cf6859fdbde7",
  type: "page-type/world-spell",
  slug: "noxious-fumes",
  title: "Noxious Fumes",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.417Z",
  updatedAt: "2026-09-22T13:34:49.000Z",
} as const satisfies WorldSpell
