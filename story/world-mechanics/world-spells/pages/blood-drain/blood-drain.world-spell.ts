import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const bloodDrain = {
  id: "01a06572-95b6-76c5-bafc-f81dac7ea443",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "blood-drain",
  title: "Blood Drain",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
