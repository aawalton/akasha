import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const lightLance = {
  id: "01a06572-95ce-7597-8771-473fb148b88a",
  type: "page-type/world-spell",
  slug: "light-lance",
  title: "Light Lance",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
