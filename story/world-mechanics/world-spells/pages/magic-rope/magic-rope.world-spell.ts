import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const magicRope = {
  id: "01a06572-95d1-7d39-a021-1dbae3e3c29e",
  type: "world-spell",
  slug: "magic-rope",
  title: "Magic Rope",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
