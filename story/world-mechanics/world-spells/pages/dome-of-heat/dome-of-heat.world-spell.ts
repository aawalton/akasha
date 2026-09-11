import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const domeOfHeat = {
  id: "01a06572-95be-75db-925e-c066f20cd7db",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "dome-of-heat",
  title: "Dome of Heat",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
