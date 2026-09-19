import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const fieldOfSuppression = {
  id: "01a06572-95c0-7ad7-b664-b226c6396e6e",
  type: "page-type/world-spell",
  slug: "field-of-suppression",
  title: "Field of Suppression",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
