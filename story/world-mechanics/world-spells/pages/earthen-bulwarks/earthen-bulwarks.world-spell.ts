import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const earthenBulwarks = {
  id: "01a06572-95be-7d9f-ad15-6b20f7b4da4d",
  type: "world-spell",
  slug: "earthen-bulwarks",
  title: "Earthen Bulwarks",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
