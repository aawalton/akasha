import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const scentlessMusk = {
  id: "01a06572-95de-769b-bb3c-14afa223e681",
  type: "world-spell",
  slug: "scentless-musk",
  title: "Scentless Musk",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
