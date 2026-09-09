import type { WorldSpell } from "../../world-spell.page-type.ts"

export const flying = {
  id: "01a06572-95c4-77e8-9319-3d7d3e81b604",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "flying",
  title: "Flying",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
