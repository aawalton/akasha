import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const globeOfAir = {
  id: "01a06572-95c6-753f-b08a-5436ec99bbca",
  type: "page-type/world-spell",
  slug: "globe-of-air",
  title: "Globe of Air",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
