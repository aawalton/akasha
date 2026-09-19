import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const domeOfWarmth = {
  id: "01a06572-95be-7508-bd19-56ea827bd4dc",
  type: "page-type/world-spell",
  slug: "dome-of-warmth",
  title: "Dome of Warmth",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
