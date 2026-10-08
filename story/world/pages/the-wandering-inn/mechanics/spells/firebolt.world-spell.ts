import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const firebolt = {
  id: "01a06572-95c2-78c9-9129-ddfe1e33054c",
  type: "page-type/world-spell",
  slug: "firebolt",
  title: "Firebolt",
  world: "world/the-wandering-inn",
  appearanceCount: 5,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.394Z",
  updatedAt: "2026-09-22T13:34:32.000Z",
} as const satisfies WorldSpell
