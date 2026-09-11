import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const lightningWard = {
  id: "01a06572-95d0-78f6-9089-2567f76d77f8",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "lightning-ward",
  title: "Lightning Ward",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
