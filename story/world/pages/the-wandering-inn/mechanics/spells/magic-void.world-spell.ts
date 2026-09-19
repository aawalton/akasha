import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const magicVoid = {
  id: "01a06572-95d1-76c6-8a5b-676e3a68da86",
  type: "page-type/world-spell",
  slug: "magic-void",
  title: "Magic Void",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
