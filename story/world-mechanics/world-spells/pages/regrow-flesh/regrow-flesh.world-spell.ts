import type { WorldSpell } from "../../world-spell.page-type.ts"

export const regrowFlesh = {
  id: "01a06572-95dc-79f9-86a3-d0504117ea51",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "regrow-flesh",
  title: "Regrow Flesh",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
