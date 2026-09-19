import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const telehop = {
  id: "01a06572-95e5-7706-8962-a7642df7450f",
  type: "page-type/world-spell",
  slug: "telehop",
  title: "Telehop",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
