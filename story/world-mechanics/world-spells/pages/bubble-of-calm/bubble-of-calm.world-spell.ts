import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const bubbleOfCalm = {
  id: "01a06572-95b7-79d7-b599-10ed52d64268",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "bubble-of-calm",
  title: "Bubble of Calm",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
