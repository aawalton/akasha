import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const acheniteSMagicalShackles = {
  id: "01a06572-95b3-7fe3-8733-a82920bb7938",
  type: "page-type/world-spell",
  slug: "achenite-s-magical-shackles",
  title: "Achenite’s Magical Shackles",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
