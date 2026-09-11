import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const massLevitation = {
  id: "01a06572-95d2-7013-a596-27a28a5ce626",
  type: "world-spell",
  slug: "mass-levitation",
  title: "Mass Levitation",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
