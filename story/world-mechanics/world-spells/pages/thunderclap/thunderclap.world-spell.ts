import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const thunderclap = {
  id: "01a06572-95e7-7f1a-b066-e1c5d9e9b8e8",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "thunderclap",
  title: "Thunderclap",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
