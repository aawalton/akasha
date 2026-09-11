import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const frostRay = {
  id: "01a06572-95c5-7cdb-846d-7475ac2d36df",
  type: "world-spell",
  slug: "frost-ray",
  title: "Frost Ray",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
