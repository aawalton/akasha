import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const detectMinuteLife = {
  id: "01a06572-95bd-7ce0-96c1-b70b59bdba94",
  type: "page-type/world-spell",
  slug: "detect-minute-life",
  title: "Detect Minute Life",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
