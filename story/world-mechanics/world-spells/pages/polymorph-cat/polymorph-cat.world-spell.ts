import type { WorldSpell } from "../../world-spell.page-type.ts"

export const polymorphCat = {
  id: "01a06572-95db-77d0-b673-d5a0f00ea6e9",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "polymorph-cat",
  title: "Polymorph: Cat",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
