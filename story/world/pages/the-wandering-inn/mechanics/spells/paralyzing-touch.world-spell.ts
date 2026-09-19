import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const paralyzingTouch = {
  id: "01a06572-95da-74dd-8af2-bb21b01a997b",
  type: "page-type/world-spell",
  slug: "paralyzing-touch",
  title: "Paralyzing Touch",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
