import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const rovingSilentSickle = {
  id: "01a06572-95de-77d2-aff0-25ccb932563b",
  type: "page-type/world-spell",
  slug: "roving-silent-sickle",
  title: "Roving Silent Sickle",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
