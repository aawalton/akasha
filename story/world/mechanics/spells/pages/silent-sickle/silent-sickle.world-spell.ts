import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const silentSickle = {
  id: "01a06572-95e1-7d64-b7da-e301bdf1771d",
  type: "page-type/world-spell",
  slug: "silent-sickle",
  title: "Silent Sickle",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
