import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const stasisField = {
  id: "01a06572-95e2-731c-9a9c-dd668f0c4a7b",
  type: "world-spell",
  slug: "stasis-field",
  title: "Stasis Field",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
