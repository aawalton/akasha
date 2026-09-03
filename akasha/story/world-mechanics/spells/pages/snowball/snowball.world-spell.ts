import type { WorldSpell } from "../../world-spell.page-type.ts"

export const snowball = {
  id: "01a06572-95e1-7ff6-86a7-b42e6d6118a1",
  pageTypeSlug: "world-spell",
  slug: "snowball",
  title: "Snowball",
  worldSlug: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
