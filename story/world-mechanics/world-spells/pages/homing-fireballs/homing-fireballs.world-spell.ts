import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const homingFireballs = {
  id: "01a06572-95c8-7435-b477-ea4a05f23e1c",
  type: "world-spell",
  slug: "homing-fireballs",
  title: "Homing Fireballs",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
