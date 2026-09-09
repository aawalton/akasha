import type { WorldSpell } from "../../world-spell.page-type.ts"

export const rushSpell = {
  id: "01a06572-95de-71c0-a0f0-171280b76f3b",
  pageTypeSlug: "world-spell",
  slug: "rush-spell",
  title: "Rush Spell",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
