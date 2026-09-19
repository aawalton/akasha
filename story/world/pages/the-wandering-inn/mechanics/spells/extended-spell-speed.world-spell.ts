import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const extendedSpellSpeed = {
  id: "01a06572-95bf-77dc-b9cc-09965fc57b5b",
  type: "page-type/world-spell",
  slug: "extended-spell-speed",
  title: "Extended Spell: Speed",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
