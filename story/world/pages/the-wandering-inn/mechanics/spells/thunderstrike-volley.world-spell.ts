import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const thunderstrikeVolley = {
  id: "01a06572-95e7-7a8e-ae58-f2834c072b75",
  type: "page-type/world-spell",
  slug: "thunderstrike-volley",
  title: "Thunderstrike Volley",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.431Z",
  updatedAt: "2026-09-22T13:35:05.000Z",
} as const satisfies WorldSpell
