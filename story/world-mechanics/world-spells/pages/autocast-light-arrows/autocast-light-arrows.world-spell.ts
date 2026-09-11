import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const autocastLightArrows = {
  id: "01a06572-95b5-72a5-bcd5-a3505ec117f5",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "autocast-light-arrows",
  title: "Autocast: Light Arrows",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
