import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const flameRay = {
  id: "01a06572-95c3-7a0e-add2-cc3448b72752",
  type: "page-type/world-spell",
  slug: "flame-ray",
  title: "Flame Ray",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.395Z",
  updatedAt: "2026-09-22T13:34:32.000Z",
} as const satisfies WorldSpell
