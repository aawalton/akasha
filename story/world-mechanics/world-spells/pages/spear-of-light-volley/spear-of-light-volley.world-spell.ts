import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const spearOfLightVolley = {
  id: "01a06572-95e1-7501-8718-c014d7d11c24",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "spear-of-light-volley",
  title: "Spear of Light Volley",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
