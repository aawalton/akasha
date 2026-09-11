import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const hardening = {
  id: "01a06572-95c8-7c77-a619-5de58cb71bb1",
  type: "world-spell",
  slug: "hardening",
  title: "Hardening",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
