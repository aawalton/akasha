import type { WorldSpell } from "../../world-spell.page-type.ts"

export const inkSpray = {
  id: "01a06572-95cb-79bc-a0c6-b877d3a77e99",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "ink-spray",
  title: "Ink Spray",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
