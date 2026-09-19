import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const searingFlash = {
  id: "01a06572-95df-7140-ace0-12e9e882e24f",
  type: "page-type/world-spell",
  slug: "searing-flash",
  title: "Searing Flash",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
