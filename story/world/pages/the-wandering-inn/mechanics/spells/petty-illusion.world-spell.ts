import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const pettyIllusion = {
  id: "01a06572-95da-70a9-8667-f7e3a7e932c8",
  type: "page-type/world-spell",
  slug: "petty-illusion",
  title: "Petty Illusion",
  world: "world/the-wandering-inn",
} as const satisfies WorldSpell
