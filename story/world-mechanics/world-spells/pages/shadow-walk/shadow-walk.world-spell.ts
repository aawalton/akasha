import type { WorldSpell } from "../../world-spell.page-type.ts"

export const shadowWalk = {
  id: "01a06572-95df-7243-a442-23a8f127d5eb",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "shadow-walk",
  title: "Shadow Walk",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
