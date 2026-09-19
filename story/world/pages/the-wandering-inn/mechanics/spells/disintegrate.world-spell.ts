import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const disintegrate = {
  id: "01a06572-95bd-75ed-8a88-30803e1bf67b",
  type: "page-type/world-spell",
  slug: "disintegrate",
  title: "Disintegrate",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
