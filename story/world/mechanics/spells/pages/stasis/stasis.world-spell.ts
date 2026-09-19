import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const stasis = {
  id: "01a06572-95e2-761d-b9be-168a19755bfb",
  type: "page-type/world-spell",
  slug: "stasis",
  title: "Stasis",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
