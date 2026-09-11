import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const reinforceBindings = {
  id: "01a06572-95dc-74f8-9207-ed827fcfbdac",
  type: "world-spell",
  slug: "reinforce-bindings",
  title: "Reinforce Bindings",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
