import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const webOfMagnesis = {
  id: "01a06572-95e9-7e97-a3c0-04ebf273323c",
  type: "page-type/world-spell",
  slug: "web-of-magnesis",
  title: "Web of Magnesis",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
