import type { WorldSpell } from "../../world-spell.page-type.ts"

export const createSnow = {
  id: "01a06572-95bb-73e1-9b44-2a8c3b9ceee6",
  pageTypeSlug: "world-spell",
  slug: "create-snow",
  title: "Create Snow",
  worldSlug: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
