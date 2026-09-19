import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const flamewall = {
  id: "01a06572-95c3-78a7-85b8-7bfa93fa75d8",
  type: "page-type/world-spell",
  slug: "flamewall",
  title: "Flamewall",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
