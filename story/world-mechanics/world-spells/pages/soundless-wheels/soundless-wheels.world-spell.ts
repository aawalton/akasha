import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const soundlessWheels = {
  id: "01a06572-95e1-7074-b63e-daa3589c5558",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "soundless-wheels",
  title: "Soundless Wheels",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
