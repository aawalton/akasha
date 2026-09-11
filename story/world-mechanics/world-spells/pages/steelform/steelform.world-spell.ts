import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const steelform = {
  id: "01a06572-95e2-7508-896b-68bd3c1e88b2",
  type: "world-spell",
  slug: "steelform",
  title: "Steelform",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
