import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const greaterFrostward = {
  id: "01a06572-95c7-721e-9243-a047142ed73c",
  type: "page-type/world-spell",
  slug: "greater-frostward",
  title: "Greater Frostward",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
