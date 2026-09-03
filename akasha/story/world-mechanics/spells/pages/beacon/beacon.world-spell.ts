import type { WorldSpell } from "../../world-spell.page-type.ts"

export const beacon = {
  id: "01a06572-95b5-7099-b0bf-b2e79d365070",
  pageTypeSlug: "world-spell",
  slug: "beacon",
  title: "Beacon",
  worldSlug: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
