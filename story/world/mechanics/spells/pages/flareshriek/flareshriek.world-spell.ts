import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const flareshriek = {
  id: "01a06572-95c3-7070-a6e9-cc4673844eca",
  type: "page-type/world-spell",
  slug: "flareshriek",
  title: "Flareshriek",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
