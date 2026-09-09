import type { WorldSpell } from "../../world-spell.page-type.ts"

export const blackout = {
  id: "01a06572-95b6-76f6-ac18-b8c6978a9058",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "blackout",
  title: "Blackout",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
