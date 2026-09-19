import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const detectMagic = {
  id: "01a06572-95bd-7409-9d7d-2e7f4beddac1",
  type: "page-type/world-spell",
  slug: "detect-magic",
  title: "Detect Magic",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
