import type { WorldSpell } from "../../world-spell.page-type.ts"

export const automaticSpellcasting = {
  id: "01a06572-95b5-7c36-9853-46ff6f068214",
  pageTypeSlug: "world-spell",
  slug: "automatic-spellcasting",
  title: "Automatic Spellcasting",
  worldSlug: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
