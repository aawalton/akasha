import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const webOfMagnesis = {
  id: "01a06572-95e9-7e97-a3c0-04ebf273323c",
  type: "page-type/world-spell",
  slug: "web-of-magnesis",
  title: "Web of Magnesis",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.433Z",
  updatedAt: "2026-09-22T13:35:07.000Z",
} as const satisfies WorldSpell
