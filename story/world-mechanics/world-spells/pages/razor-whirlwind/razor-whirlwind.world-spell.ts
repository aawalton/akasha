import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const razorWhirlwind = {
  id: "01a06572-95dc-7aeb-b65d-8ec7a6a14728",
  type: "world-spell",
  slug: "razor-whirlwind",
  title: "Razor Whirlwind",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
