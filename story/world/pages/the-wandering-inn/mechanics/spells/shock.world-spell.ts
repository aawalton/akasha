import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const shock = {
  id: "01a06572-95e0-7c7e-a32e-4ccfa3f2a29a",
  type: "page-type/world-spell",
  slug: "shock",
  title: "Shock",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
