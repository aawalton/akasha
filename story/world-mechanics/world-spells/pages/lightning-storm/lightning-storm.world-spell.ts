import type { WorldSpell } from "../../world-spell.page-type.ts"

export const lightningStorm = {
  id: "01a06572-95d0-73ca-a51b-23bc0e0b8a4e",
  pageTypeSlug: "world-spell",
  slug: "lightning-storm",
  title: "Lightning Storm",
  worldSlug: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
