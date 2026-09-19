import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const flareburst = {
  id: "01a06572-95c3-7e49-aa2b-f57b72ccdbed",
  type: "page-type/world-spell",
  slug: "flareburst",
  title: "Flareburst",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
