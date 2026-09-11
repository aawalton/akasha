import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const calm = {
  id: "01a06572-95b8-73fa-b12c-878f89f5ff3b",
  type: "world-spell",
  slug: "calm",
  title: "Calm",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
