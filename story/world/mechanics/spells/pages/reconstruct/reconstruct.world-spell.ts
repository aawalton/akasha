import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const reconstruct = {
  id: "01a06572-95dc-7578-a9ba-037681c700dc",
  type: "page-type/world-spell",
  slug: "reconstruct",
  title: "Reconstruct",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
