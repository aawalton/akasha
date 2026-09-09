import type { WorldSpell } from "../../world-spell.page-type.ts"

export const coldAir = {
  id: "01a06572-95b9-7034-b1cd-f1957699f7ad",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "cold-air",
  title: "Cold Air",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
