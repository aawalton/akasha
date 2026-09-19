import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const shadowLeap = {
  id: "01a06572-95df-7669-b8a8-ffbe08e3b2e5",
  type: "page-type/world-spell",
  slug: "shadow-leap",
  title: "Shadow Leap",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
