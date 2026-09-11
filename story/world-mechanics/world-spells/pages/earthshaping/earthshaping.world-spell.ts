import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const earthshaping = {
  id: "01a06572-95bf-7e6c-916d-e9fe8e7622fc",
  type: "world-spell",
  slug: "earthshaping",
  title: "Earthshaping",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
