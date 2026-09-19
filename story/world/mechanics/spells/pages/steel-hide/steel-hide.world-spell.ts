import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const steelHide = {
  id: "01a06572-95e2-71b0-a1a4-ffca62eb1dcd",
  type: "page-type/world-spell",
  slug: "steel-hide",
  title: "Steel Hide",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
