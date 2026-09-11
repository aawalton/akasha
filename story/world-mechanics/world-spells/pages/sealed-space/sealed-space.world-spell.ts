import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const sealedSpace = {
  id: "01a06572-95df-7f7a-b484-df35d062a68d",
  type: "world-spell",
  slug: "sealed-space",
  title: "Sealed Space",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
