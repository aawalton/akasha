import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const scrying = {
  id: "01a06572-95df-7f4f-95fa-c51edf739378",
  type: "page-type/world-spell",
  slug: "scrying",
  title: "Scrying",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
