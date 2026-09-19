import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const jetOfAir = {
  id: "01a06572-95cc-74d7-8215-02f56e65c516",
  type: "page-type/world-spell",
  slug: "jet-of-air",
  title: "Jet of Air",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
