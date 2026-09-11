import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const earthenSpires = {
  id: "01a06572-95bf-735f-bbc0-582516f6ed40",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "earthen-spires",
  title: "Earthen Spires",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
