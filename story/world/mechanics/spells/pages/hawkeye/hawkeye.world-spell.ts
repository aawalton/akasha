import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const hawkeye = {
  id: "01a06572-95c8-7bf9-ae08-71b3daba61e0",
  type: "page-type/world-spell",
  slug: "hawkeye",
  title: "Hawkeye",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
