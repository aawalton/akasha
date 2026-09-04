import type { WorldSpell } from "../../world-spell.page-type.ts"

export const lightArrow = {
  id: "01a06572-95cd-723f-8d9d-f99528c0abdb",
  pageTypeSlug: "world-spell",
  slug: "light-arrow",
  title: "Light Arrow",
  worldSlug: "the-wandering-inn",
  aliases: ["light-arrows"],
  references: "jsonl",
} as const satisfies WorldSpell
