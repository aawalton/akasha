import type { WorldSpell } from "../../world-spell.page-type.ts"

export const soothe = {
  id: "01a06572-95e1-70a7-83a3-a6f977988a81",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "soothe",
  title: "Soothe",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
