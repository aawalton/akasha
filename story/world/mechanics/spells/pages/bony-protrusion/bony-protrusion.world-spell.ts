import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const bonyProtrusion = {
  id: "01a06572-95b7-7d60-95c1-f1c8d7c1526a",
  type: "page-type/world-spell",
  slug: "bony-protrusion",
  title: "Bony Protrusion",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
