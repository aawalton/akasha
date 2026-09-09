import type { WorldSpell } from "../../world-spell.page-type.ts"

export const spiderweb = {
  id: "01a06572-95e2-7d10-b6ac-7bdd2ad3a98a",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "spiderweb",
  title: "Spiderweb",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
