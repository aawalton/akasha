import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const antiFlame = {
  id: "01a06572-95b4-7e26-b3df-b1c4a1b256f4",
  type: "world-spell",
  slug: "anti-flame",
  title: "Anti-Flame",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
