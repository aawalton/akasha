import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const naturalCamouflage = {
  id: "01a06572-95d9-73c2-926e-6c724a4cbe7d",
  type: "world-spell",
  slug: "natural-camouflage",
  title: "Natural Camouflage",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
