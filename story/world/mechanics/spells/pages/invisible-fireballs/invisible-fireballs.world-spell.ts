import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const invisibleFireballs = {
  id: "01a06572-95cc-7f38-a290-249739c9f936",
  type: "page-type/world-spell",
  slug: "invisible-fireballs",
  title: "Invisible Fireballs",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
