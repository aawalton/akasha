import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const razorwind = {
  id: "01a06572-95dc-7a90-ad48-0686901b6125",
  type: "world-spell",
  slug: "razorwind",
  title: "Razorwind",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
