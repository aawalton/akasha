import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const domeOfAir = {
  id: "01a06572-95be-7431-9d26-ab6812d1d0a5",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "dome-of-air",
  title: "Dome of Air",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
