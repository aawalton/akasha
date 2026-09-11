import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const icyLance = {
  id: "01a06572-95cb-768b-8745-eb3064e8a39a",
  type: "world-spell",
  slug: "icy-lance",
  title: "Icy Lance",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
