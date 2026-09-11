import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const greaterScrying = {
  id: "01a06572-95c7-74ab-9aba-4af675de9b5c",
  type: "world-spell",
  slug: "greater-scrying",
  title: "Greater Scrying",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
