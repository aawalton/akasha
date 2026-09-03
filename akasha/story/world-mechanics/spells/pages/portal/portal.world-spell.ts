import type { WorldSpell } from "../../world-spell.page-type.ts"

export const portal = {
  id: "01a06572-95db-7caa-9e61-cc93bb020198",
  pageTypeSlug: "world-spell",
  slug: "portal",
  title: "Portal",
  worldSlug: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
