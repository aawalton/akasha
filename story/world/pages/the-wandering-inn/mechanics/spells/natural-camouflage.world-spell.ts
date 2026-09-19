import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const naturalCamouflage = {
  id: "01a06572-95d9-73c2-926e-6c724a4cbe7d",
  type: "page-type/world-spell",
  slug: "natural-camouflage",
  title: "Natural Camouflage",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
