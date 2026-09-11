import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const flareshriek = {
  id: "01a06572-95c3-7070-a6e9-cc4673844eca",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "flareshriek",
  title: "Flareshriek",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
