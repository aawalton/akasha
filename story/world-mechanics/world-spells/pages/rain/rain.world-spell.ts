import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const rain = {
  id: "01a06572-95dc-745a-8b2f-bd3f0fcea819",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "rain",
  title: "Rain",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
