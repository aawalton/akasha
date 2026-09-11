import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const activateGreaterTeleportationRune = {
  id: "01a06572-95b3-7f82-820a-dd233f62552a",
  type: "world-spell",
  slug: "activate-greater-teleportation-rune",
  title: "Activate Greater Teleportation Rune",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
