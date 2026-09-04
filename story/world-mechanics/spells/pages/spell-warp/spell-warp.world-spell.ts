import type { WorldSpell } from "../../world-spell.page-type.ts"

export const spellWarp = {
  id: "01a06572-95e2-7cb1-9afd-a168dce74f13",
  pageTypeSlug: "world-spell",
  slug: "spell-warp",
  title: "Spell Warp",
  worldSlug: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
