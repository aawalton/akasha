import type { WorldSpell } from "../../world-spell.page-type.ts"

export const extendedSpellSpeed = {
  id: "01a06572-95bf-77dc-b9cc-09965fc57b5b",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "extended-spell-speed",
  title: "Extended Spell: Speed",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
