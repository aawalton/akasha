import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const burningLightning = {
  id: "01a06572-95b8-7e01-ba46-78c1244ce9ff",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "burning-lightning",
  title: "Burning Lightning",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
