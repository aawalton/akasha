import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const secondBurningSun = {
  id: "01a06572-95df-7518-af7f-ff07bf3ae0f4",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "second-burning-sun",
  title: "Second Burning Sun",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
