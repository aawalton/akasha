import type { WorldSpell } from "../../world-spell.page-type.ts"

export const spellguard = {
  id: "01a06572-95e2-7992-8673-88429d950b3f",
  pageTypeSlug: "world-spell",
  slug: "spellguard",
  title: "Spellguard",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
