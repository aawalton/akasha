import type { WorldSpell } from "../../world-spell.page-type.ts"

export const fleshRegrowth = {
  id: "01a06572-95c4-7177-89e1-552ce1885daf",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "flesh-regrowth",
  title: "Flesh Regrowth",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
