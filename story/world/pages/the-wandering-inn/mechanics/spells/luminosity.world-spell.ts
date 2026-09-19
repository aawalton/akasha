import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const luminosity = {
  id: "01a06572-95d0-7fdf-a10f-42a983d2381e",
  type: "page-type/world-spell",
  slug: "luminosity",
  title: "Luminosity",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
