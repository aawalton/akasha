import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const perfectMuffle = {
  id: "01a06572-95da-78bd-b8b1-75be80c4887d",
  type: "page-type/world-spell",
  slug: "perfect-muffle",
  title: "Perfect Muffle",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
