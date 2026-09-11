import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const hysteria = {
  id: "01a06572-95c9-70b7-921a-42a7c73333f3",
  type: "world-spell",
  slug: "hysteria",
  title: "Hysteria",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
