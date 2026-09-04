import type { WorldSpell } from "../../world-spell.page-type.ts"

export const regrowWood = {
  id: "01a06572-95dc-7a05-bf9f-0668a827dca9",
  pageTypeSlug: "world-spell",
  slug: "regrow-wood",
  title: "Regrow Wood",
  worldSlug: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
