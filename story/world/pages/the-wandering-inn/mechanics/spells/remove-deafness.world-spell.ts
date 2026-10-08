import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const removeDeafness = {
  id: "01a06572-95dc-79a3-8351-bcbcda5863f9",
  type: "page-type/world-spell",
  slug: "remove-deafness",
  title: "Remove Deafness",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.420Z",
  updatedAt: "2026-09-22T13:34:57.000Z",
} as const satisfies WorldSpell
