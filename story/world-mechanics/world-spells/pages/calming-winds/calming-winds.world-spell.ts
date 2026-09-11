import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const calmingWinds = {
  id: "01a06572-95b8-7563-9963-bfb9bf20d4e4",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "calming-winds",
  title: "Calming Winds",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
