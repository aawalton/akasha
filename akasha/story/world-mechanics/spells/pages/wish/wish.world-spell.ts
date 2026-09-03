import type { WorldSpell } from "../../world-spell.page-type.ts"

export const wish = {
  id: "01a06572-95ea-7d9b-ba70-cf7ecdb89644",
  pageTypeSlug: "world-spell",
  slug: "wish",
  title: "Wish",
  worldSlug: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
