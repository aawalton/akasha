import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const blindness = {
  id: "01a06572-95b6-7a10-93da-56cdcd8626a6",
  type: "page-type/world-spell",
  slug: "blindness",
  title: "Blindness",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
