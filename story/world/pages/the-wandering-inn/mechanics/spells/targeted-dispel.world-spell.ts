import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const targetedDispel = {
  id: "01a06572-95e5-7520-a44a-ee91ae54941a",
  type: "page-type/world-spell",
  slug: "targeted-dispel",
  title: "Targeted Dispel",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.429Z",
  updatedAt: "2026-09-22T13:35:05.000Z",
} as const satisfies WorldSpell
