import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const twoHundredArrowsOfStone = {
  id: "01a06572-95e7-7047-8e4a-d48a69b762f8",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "two-hundred-arrows-of-stone",
  title: "Two Hundred Arrows of Stone",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
