import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const scryingPaltFenrisol = {
  id: "01a06572-95de-708e-baf7-f7946220a528",
  type: "page-type/world-spell",
  slug: "scrying-palt-fenrisol",
  title: "Scrying: Palt Fenrisol",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
