import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const removeBlindness = {
  id: "01a06572-95dc-7bb8-a51c-cf847351d055",
  type: "page-type/world-spell",
  slug: "remove-blindness",
  title: "Remove Blindness",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.420Z",
  updatedAt: "2026-09-22T13:34:57.000Z",
} as const satisfies WorldSpell
