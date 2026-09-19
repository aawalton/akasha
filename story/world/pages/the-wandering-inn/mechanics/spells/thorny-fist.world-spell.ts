import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const thornyFist = {
  id: "01a06572-95e6-7223-87a2-4e5ed51f8de4",
  type: "page-type/world-spell",
  slug: "thorny-fist",
  title: "Thorny Fist",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
