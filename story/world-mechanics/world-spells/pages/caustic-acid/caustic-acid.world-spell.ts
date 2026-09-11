import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const causticAcid = {
  id: "01a06572-95b8-7614-b06b-52642bb17725",
  type: "world-spell",
  slug: "caustic-acid",
  title: "Caustic Acid",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
