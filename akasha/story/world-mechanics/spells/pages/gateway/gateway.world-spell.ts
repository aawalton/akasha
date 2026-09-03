import type { WorldSpell } from "../../world-spell.page-type.ts"

export const gateway = {
  id: "01a06572-95c6-7ec0-bc47-4d31d4d79c9d",
  pageTypeSlug: "world-spell",
  slug: "gateway",
  title: "Gateway",
  worldSlug: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
