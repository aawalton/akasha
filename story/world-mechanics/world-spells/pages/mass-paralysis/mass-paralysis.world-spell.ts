import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const massParalysis = {
  id: "01a06572-95d2-73ce-aed2-49d8ea448611",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "mass-paralysis",
  title: "Mass Paralysis",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
