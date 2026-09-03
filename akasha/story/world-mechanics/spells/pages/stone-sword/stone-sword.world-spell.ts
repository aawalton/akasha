import type { WorldSpell } from "../../world-spell.page-type.ts"

export const stoneSword = {
  id: "01a06572-95e3-7370-8198-4a00abf0a6d6",
  pageTypeSlug: "world-spell",
  slug: "stone-sword",
  title: "Stone Sword",
  worldSlug: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
