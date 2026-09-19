import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const sharkskinHide = {
  id: "01a06572-95df-777c-bffd-a0ec00cc77a8",
  type: "page-type/world-spell",
  slug: "sharkskin-hide",
  title: "Sharkskin Hide",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
