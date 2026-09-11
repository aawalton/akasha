import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const localizedEarthquake = {
  id: "01a06572-95d0-7df4-94ae-433d4b40d753",
  type: "world-spell",
  slug: "localized-earthquake",
  title: "Localized Earthquake",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
