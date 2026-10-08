import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const chameleon = {
  id: "01a06572-95b8-7ab0-bf49-80a12b5976b6",
  type: "page-type/world-spell",
  slug: "chameleon",
  title: "Chameleon",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.384Z",
  updatedAt: "2026-09-22T13:34:24.000Z",
} as const satisfies WorldSpell
