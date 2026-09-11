import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const burningGrandLightning = {
  id: "01a06572-95b8-7853-9635-d9561d50d553",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "burning-grand-lightning",
  title: "Burning Grand Lightning",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
