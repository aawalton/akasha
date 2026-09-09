import type { WorldSpell } from "../../world-spell.page-type.ts"

export const hexEater = {
  id: "01a06572-95c8-751f-9241-4449d2f35115",
  pageTypeSlug: "world-spell",
  slug: "hex-eater",
  title: "Hex Eater",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
