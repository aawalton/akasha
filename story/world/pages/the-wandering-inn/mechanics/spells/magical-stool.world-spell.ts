import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const magicalStool = {
  id: "01a06572-95d1-7387-bc60-c270313fcc0a",
  type: "page-type/world-spell",
  slug: "magical-stool",
  title: "Magical Stool",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
