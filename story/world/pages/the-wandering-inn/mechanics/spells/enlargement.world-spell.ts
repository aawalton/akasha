import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const enlargement = {
  id: "01a06572-95bf-7f1c-b5c6-63b50dae409e",
  type: "page-type/world-spell",
  slug: "enlargement",
  title: "Enlargement",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
