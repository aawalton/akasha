import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const earthenSpires = {
  id: "01a06572-95bf-735f-bbc0-582516f6ed40",
  type: "page-type/world-spell",
  slug: "earthen-spires",
  title: "Earthen Spires",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
