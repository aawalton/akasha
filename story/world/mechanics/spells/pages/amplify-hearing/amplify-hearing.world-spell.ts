import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const amplifyHearing = {
  id: "01a06572-95b4-7ff8-a419-f562251820c2",
  type: "page-type/world-spell",
  slug: "amplify-hearing",
  title: "Amplify Hearing",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
