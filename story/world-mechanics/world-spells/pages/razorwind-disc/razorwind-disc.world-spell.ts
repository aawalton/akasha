import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const razorwindDisc = {
  id: "01a06572-95dc-7c1b-a84a-9d38ac22fb46",
  type: "world-spell",
  slug: "razorwind-disc",
  title: "Razorwind Disc",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
