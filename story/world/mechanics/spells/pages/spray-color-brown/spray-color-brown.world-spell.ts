import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const sprayColorBrown = {
  id: "01a06572-95e2-7376-9a27-661b4c37d4a0",
  type: "page-type/world-spell",
  slug: "spray-color-brown",
  title: "Spray Color: Brown",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
