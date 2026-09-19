import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const flashstep = {
  id: "01a06572-95c4-702c-b45b-9462b1d76b4a",
  type: "page-type/world-spell",
  slug: "flashstep",
  title: "Flashstep",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
