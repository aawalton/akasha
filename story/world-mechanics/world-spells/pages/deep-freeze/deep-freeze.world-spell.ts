import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const deepFreeze = {
  id: "01a06572-95bc-796f-98fd-986c7c40d600",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "deep-freeze",
  title: "Deep Freeze",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
