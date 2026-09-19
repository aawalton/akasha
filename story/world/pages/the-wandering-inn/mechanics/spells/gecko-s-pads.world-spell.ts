import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const geckoSPads = {
  id: "01a06572-95c6-7a28-b76c-db50c46139a4",
  type: "page-type/world-spell",
  slug: "gecko-s-pads",
  title: "Gecko’s Pads",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
