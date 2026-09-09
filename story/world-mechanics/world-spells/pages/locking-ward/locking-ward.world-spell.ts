import type { WorldSpell } from "../../world-spell.page-type.ts"

export const lockingWard = {
  id: "01a06572-95d0-7463-aa0c-88ca91e7ab05",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "locking-ward",
  title: "Locking Ward",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
