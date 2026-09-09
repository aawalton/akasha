import type { WorldSpell } from "../../world-spell.page-type.ts"

export const polymorph = {
  id: "01a06572-95db-70ac-bb1f-7fa2f3f2bc61",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "polymorph",
  title: "Polymorph",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
