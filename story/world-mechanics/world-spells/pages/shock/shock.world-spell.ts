import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const shock = {
  id: "01a06572-95e0-7c7e-a32e-4ccfa3f2a29a",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "shock",
  title: "Shock",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
