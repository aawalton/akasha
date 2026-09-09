import type { WorldSpell } from "../../world-spell.page-type.ts"

export const shatterbolts = {
  id: "01a06572-95e0-7fcf-8a11-7e67d993b7af",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "shatterbolts",
  title: "Shatterbolts",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
