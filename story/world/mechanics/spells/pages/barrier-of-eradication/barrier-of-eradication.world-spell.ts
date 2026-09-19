import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const barrierOfEradication = {
  id: "01a06572-95b5-7197-bb0c-32496044b589",
  type: "page-type/world-spell",
  slug: "barrier-of-eradication",
  title: "Barrier of Eradication",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
