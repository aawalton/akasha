import type { WorldSpell } from "../../world-spell.page-type.ts"

export const waterbreathing = {
  id: "01a06572-95e9-7794-b1bd-fa04c461a40c",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "waterbreathing",
  title: "Waterbreathing",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
