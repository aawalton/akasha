import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const unlock = {
  id: "01a06572-95e8-7496-828c-2d878c612abd",
  type: "page-type/world-spell",
  slug: "unlock",
  title: "Unlock",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
