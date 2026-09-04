import type { WorldSpell } from "../../world-spell.page-type.ts"

export const manaBrick = {
  id: "01a06572-95d1-7e24-9a52-b1c0cd5cfbbe",
  pageTypeSlug: "world-spell",
  slug: "mana-brick",
  title: "Mana Brick",
  worldSlug: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
