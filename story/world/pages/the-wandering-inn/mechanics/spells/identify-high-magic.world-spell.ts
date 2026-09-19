import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const identifyHighMagic = {
  id: "01a06572-95cb-78eb-a126-4b040e40d1bc",
  type: "page-type/world-spell",
  slug: "identify-high-magic",
  title: "Identify High Magic",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
