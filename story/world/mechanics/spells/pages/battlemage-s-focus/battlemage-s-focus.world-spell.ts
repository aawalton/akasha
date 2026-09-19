import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const battlemageSFocus = {
  id: "01a06572-95b5-72c6-aa06-338c7585287f",
  type: "page-type/world-spell",
  slug: "battlemage-s-focus",
  title: "Battlemage’s Focus",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
