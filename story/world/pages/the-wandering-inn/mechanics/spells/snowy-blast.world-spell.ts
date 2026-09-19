import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const snowyBlast = {
  id: "01a06572-95e1-73fc-a217-5095a4c97fb5",
  type: "page-type/world-spell",
  slug: "snowy-blast",
  title: "Snowy Blast",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
