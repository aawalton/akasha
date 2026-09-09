import type { WorldSpell } from "../../world-spell.page-type.ts"

export const splinterSpell = {
  id: "01a06572-95e2-7513-bf85-de94211ce04d",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "splinter-spell",
  title: "Splinter Spell",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
