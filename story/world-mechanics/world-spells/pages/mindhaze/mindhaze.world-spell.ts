import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const mindhaze = {
  id: "01a06572-95d9-7853-ba7e-799dea9bdf63",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "mindhaze",
  title: "Mindhaze",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
