import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const lightBridges = {
  id: "01a06572-95ce-7af9-a351-f59d033211f9",
  type: "page-type/world-spell",
  slug: "light-bridges",
  title: "Light Bridges",
  world: "world/the-wandering-inn",
  appearanceCount: 6,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.406Z",
  updatedAt: "2026-09-22T13:34:41.000Z",
} as const satisfies WorldSpell
