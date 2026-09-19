import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const multipliedStoneFists = {
  id: "01a06572-95d9-7f40-8711-1e5d44f595d7",
  type: "page-type/world-spell",
  slug: "multiplied-stone-fists",
  title: "Multiplied Stone Fists",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
