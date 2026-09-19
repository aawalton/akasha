import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const bansheeSShriek = {
  id: "01a06572-95b5-7675-9f97-f42281039700",
  type: "page-type/world-spell",
  slug: "banshee-s-shriek",
  title: "Banshee’s Shriek",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
