import type { WorldSpell } from "../../world-spell.page-type.ts"

export const lightweight = {
  id: "01a06572-95d0-7d66-9a7f-55a88a711321",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "lightweight",
  title: "Lightweight",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
