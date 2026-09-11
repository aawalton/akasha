import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const silentSickle = {
  id: "01a06572-95e1-7d64-b7da-e301bdf1771d",
  type: "world-spell",
  slug: "silent-sickle",
  title: "Silent Sickle",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
