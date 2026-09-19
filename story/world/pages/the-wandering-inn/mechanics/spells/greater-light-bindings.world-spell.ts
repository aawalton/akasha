import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const greaterLightBindings = {
  id: "01a06572-95c7-7ba9-b588-8b3528f6895c",
  type: "page-type/world-spell",
  slug: "greater-light-bindings",
  title: "Greater Light Bindings",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
