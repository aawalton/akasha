import type { WorldSpell } from "akasha/story/world-mechanic/world-spell/world-spell.page-type.types.ts"

export const domeOfAir = {
  id: "01a06572-95be-7431-9d26-ab6812d1d0a5",
  type: "world-spell",
  slug: "dome-of-air",
  title: "Dome of Air",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
