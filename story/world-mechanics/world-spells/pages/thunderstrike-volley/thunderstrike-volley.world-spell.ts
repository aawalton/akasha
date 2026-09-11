import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const thunderstrikeVolley = {
  id: "01a06572-95e7-7a8e-ae58-f2834c072b75",
  type: "world-spell",
  slug: "thunderstrike-volley",
  title: "Thunderstrike Volley",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
