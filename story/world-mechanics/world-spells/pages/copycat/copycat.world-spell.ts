import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const copycat = {
  id: "01a06572-95bb-7db3-a216-ee11af26a9ef",
  type: "world-spell",
  slug: "copycat",
  title: "Copycat",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
