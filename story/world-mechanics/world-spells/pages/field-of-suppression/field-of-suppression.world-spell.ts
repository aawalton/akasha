import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const fieldOfSuppression = {
  id: "01a06572-95c0-7ad7-b664-b226c6396e6e",
  type: "world-spell",
  slug: "field-of-suppression",
  title: "Field of Suppression",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
