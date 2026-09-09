import type { WorldSpell } from "../../world-spell.page-type.ts"

export const bubbleOfAir = {
  id: "01a06572-95b7-7c87-8077-08b754118257",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "bubble-of-air",
  title: "Bubble of Air",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
