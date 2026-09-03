import type { WorldSpell } from "../../world-spell.page-type.ts"

export const stun = {
  id: "01a06572-95e4-76a7-a8d0-dedd491c84ab",
  pageTypeSlug: "world-spell",
  slug: "stun",
  title: "Stun",
  worldSlug: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
