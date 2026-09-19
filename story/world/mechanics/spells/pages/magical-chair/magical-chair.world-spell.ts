import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const magicalChair = {
  id: "01a06572-95d1-74a8-9aa4-2f6ecb04f34d",
  type: "page-type/world-spell",
  slug: "magical-chair",
  title: "Magical Chair",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
