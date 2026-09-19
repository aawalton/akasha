import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const soothingPresence = {
  id: "01a06572-95e1-7ea2-9c6c-8a44ff40de3f",
  type: "page-type/world-spell",
  slug: "soothing-presence",
  title: "Soothing Presence",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
