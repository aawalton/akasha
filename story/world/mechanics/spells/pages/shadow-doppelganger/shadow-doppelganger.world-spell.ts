import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const shadowDoppelganger = {
  id: "01a06572-95df-736c-8900-2d9d8e5edb9e",
  type: "page-type/world-spell",
  slug: "shadow-doppelganger",
  title: "Shadow Doppelganger",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
