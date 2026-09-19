import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const mindOfTheTranquilMonk = {
  id: "01a06572-95d9-7bab-ae48-77dbe9212bda",
  type: "page-type/world-spell",
  slug: "mind-of-the-tranquil-monk",
  title: "Mind of the Tranquil Monk",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
