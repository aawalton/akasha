import type { WorldSpell } from "../../world-spell.page-type.ts"

export const detectMagic = {
  id: "01a06572-95bd-7409-9d7d-2e7f4beddac1",
  pageTypeSlug: "world-spell",
  slug: "detect-magic",
  title: "Detect Magic",
  worldSlug: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
