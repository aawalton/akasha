import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const superSupportiveSpellTraceSearch = {
  id: "01a0e9f8-aa23-791f-a6a4-f29dcf604b1d",
  type: "page-type/world-spell",
  slug: "super-supportive-spell-trace-search",
  title: "Spell trace search",
  world: "world/super-supportive",
  description: "A search for signs that a spell was cast in a place.",
} as const satisfies WorldSpell
