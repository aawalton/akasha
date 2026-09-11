import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const hasted = {
  id: "01a06572-95c8-7ec6-9be1-fb406de73f0f",
  type: "world-spell",
  slug: "hasted",
  title: "Hasted",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
