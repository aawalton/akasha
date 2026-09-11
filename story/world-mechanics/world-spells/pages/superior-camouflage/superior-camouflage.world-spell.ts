import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const superiorCamouflage = {
  id: "01a06572-95e4-7f56-ab80-970893e7a17c",
  type: "world-spell",
  slug: "superior-camouflage",
  title: "Superior Camouflage",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
