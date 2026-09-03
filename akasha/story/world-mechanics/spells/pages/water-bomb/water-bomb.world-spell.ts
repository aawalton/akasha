import type { WorldSpell } from "../../world-spell.page-type.ts"

export const waterBomb = {
  id: "01a06572-95e9-7139-b485-15460ab4ac43",
  pageTypeSlug: "world-spell",
  slug: "water-bomb",
  title: "Water Bomb",
  worldSlug: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
