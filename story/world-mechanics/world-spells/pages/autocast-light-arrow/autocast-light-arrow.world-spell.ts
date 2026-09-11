import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const autocastLightArrow = {
  id: "01a06572-95b5-76cb-af0f-ba2a94647d8d",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "autocast-light-arrow",
  title: "Autocast: Light Arrow",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
