import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const stoneLance = {
  id: "01a06572-95e3-7c27-aef8-efd0de676b7a",
  type: "page-type/world-spell",
  slug: "stone-lance",
  title: "Stone Lance",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
