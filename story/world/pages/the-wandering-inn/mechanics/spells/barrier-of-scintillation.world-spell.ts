import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const barrierOfScintillation = {
  id: "01a06572-95b5-70a5-9551-f1dde1c2e597",
  type: "page-type/world-spell",
  slug: "barrier-of-scintillation",
  title: "Barrier of Scintillation",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
