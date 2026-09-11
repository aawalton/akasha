import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const darkness = {
  id: "01a06572-95bb-7426-be12-f4bb3774da22",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "darkness",
  title: "Darkness",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
