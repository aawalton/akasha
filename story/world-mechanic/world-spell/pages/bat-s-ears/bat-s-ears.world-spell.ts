import type { WorldSpell } from "akasha/story/world-mechanic/world-spell/world-spell.page-type.types.ts"

export const batSEars = {
  id: "01a06572-95b5-7fcf-a679-0613de9b2ffc",
  type: "world-spell",
  slug: "bat-s-ears",
  title: "Bat’s Ears",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
