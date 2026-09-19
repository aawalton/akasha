import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const cushion = {
  id: "01a06572-95bb-775b-ad58-2d8b8e82ae55",
  type: "page-type/world-spell",
  slug: "cushion",
  title: "Cushion",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
