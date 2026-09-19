import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const coldAir = {
  id: "01a06572-95b9-7034-b1cd-f1957699f7ad",
  type: "page-type/world-spell",
  slug: "cold-air",
  title: "Cold Air",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
