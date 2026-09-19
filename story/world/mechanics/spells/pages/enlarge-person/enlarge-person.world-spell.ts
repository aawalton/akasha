import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const enlargePerson = {
  id: "01a06572-95bf-7079-a9be-9133c0f281fe",
  type: "page-type/world-spell",
  slug: "enlarge-person",
  title: "Enlarge Person",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
