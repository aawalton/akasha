import type { WorldSpell } from "../../world-spell.page-type.ts"

export const openPortal = {
  id: "01a06572-95da-74a2-993b-ef0c5c1cf740",
  pageTypeSlug: "world-spell",
  slug: "open-portal",
  title: "Open Portal",
  worldSlug: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
