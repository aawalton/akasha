import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const doppelganger = {
  id: "01a06572-95be-703c-b47c-8e36590e9b5b",
  type: "page-type/world-spell",
  slug: "doppelganger",
  title: "Doppelganger",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
