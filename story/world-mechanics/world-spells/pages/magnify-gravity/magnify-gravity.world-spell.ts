import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const magnifyGravity = {
  id: "01a06572-95d1-7aaa-b90e-0342afcad650",
  type: "world-spell",
  slug: "magnify-gravity",
  title: "Magnify Gravity",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
