import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const haltSpell = {
  id: "01a06572-95c8-7325-988a-e4c7b8dbd145",
  type: "page-type/world-spell",
  slug: "halt-spell",
  title: "Halt Spell",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
