import type { WorldSpell } from "../../world-spell.page-type.ts"

export const conjureStool = {
  id: "01a06572-95ba-71e1-8b20-de08b68c4c89",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "conjure-stool",
  title: "Conjure Stool",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
