import type { WorldSpell } from "../../world-spell.page-type.ts"

export const manaBubble = {
  id: "01a06572-95d1-7bfc-9a99-bbad5bc465e2",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "mana-bubble",
  title: "Mana Bubble",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
