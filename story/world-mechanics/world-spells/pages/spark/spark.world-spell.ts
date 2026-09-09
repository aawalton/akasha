import type { WorldSpell } from "../../world-spell.page-type.ts"

export const spark = {
  id: "01a06572-95e1-7607-9fd5-c507ac1e80b0",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "spark",
  title: "Spark",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
