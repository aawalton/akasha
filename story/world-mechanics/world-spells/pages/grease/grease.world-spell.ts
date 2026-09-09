import type { WorldSpell } from "../../world-spell.page-type.ts"

export const grease = {
  id: "01a06572-95c6-73f5-8de3-ecf4903e4390",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "grease",
  title: "Grease",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
