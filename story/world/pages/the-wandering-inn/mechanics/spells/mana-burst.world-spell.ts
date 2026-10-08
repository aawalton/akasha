import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const manaBurst = {
  id: "01a06572-95d1-764e-8173-ed174c4cd1dd",
  type: "page-type/world-spell",
  slug: "mana-burst",
  title: "Mana Burst",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.409Z",
  updatedAt: "2026-09-22T13:34:49.000Z",
} as const satisfies WorldSpell
