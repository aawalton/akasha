import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const kelpicRegrowth = {
  id: "01a06572-95cc-7990-bc3f-8f6a26c89185",
  type: "world-spell",
  slug: "kelpic-regrowth",
  title: "Kelpic Regrowth",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
