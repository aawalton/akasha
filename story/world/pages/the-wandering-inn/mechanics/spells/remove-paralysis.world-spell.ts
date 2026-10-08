import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const removeParalysis = {
  id: "01a06572-95dd-7015-b059-00ee65842463",
  type: "page-type/world-spell",
  slug: "remove-paralysis",
  title: "Remove Paralysis",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.421Z",
  updatedAt: "2026-09-22T13:34:57.000Z",
} as const satisfies WorldSpell
