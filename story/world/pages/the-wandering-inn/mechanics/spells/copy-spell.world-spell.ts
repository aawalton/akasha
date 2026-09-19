import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const copySpell = {
  id: "01a06572-95bb-7eb6-ae13-b3806b7fce11",
  type: "page-type/world-spell",
  slug: "copy-spell",
  title: "Copy Spell",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
