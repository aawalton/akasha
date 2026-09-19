import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const sanctuaryOfLight = {
  id: "01a06572-95de-7588-9007-5d0f7659aec5",
  type: "page-type/world-spell",
  slug: "sanctuary-of-light",
  title: "Sanctuary of Light",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
