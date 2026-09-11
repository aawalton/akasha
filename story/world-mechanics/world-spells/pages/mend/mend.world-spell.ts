import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const mend = {
  id: "01a06572-95d2-7f8f-beaf-a2698b48a26f",
  type: "world-spell",
  slug: "mend",
  title: "Mend",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
