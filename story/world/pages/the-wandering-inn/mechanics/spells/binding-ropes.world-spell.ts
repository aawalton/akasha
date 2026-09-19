import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const bindingRopes = {
  id: "01a06572-95b6-729a-b03b-ac78f1a6bfb3",
  type: "page-type/world-spell",
  slug: "binding-ropes",
  title: "Binding Ropes",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
