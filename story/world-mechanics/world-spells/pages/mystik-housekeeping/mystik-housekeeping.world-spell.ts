import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const mystikHousekeeping = {
  id: "01a06572-95d9-7586-baa0-55e334473270",
  type: "world-spell",
  slug: "mystik-housekeeping",
  title: "Mystik Housekeeping",
  world: "the-wandering-inn",
} as const satisfies WorldSpell
