import type { WorldSpell } from "../../world-spell.page-type.ts"

export const stunSpear = {
  id: "01a06572-95e4-7842-94f8-f7916046a324",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "stun-spear",
  title: "Stun Spear",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
