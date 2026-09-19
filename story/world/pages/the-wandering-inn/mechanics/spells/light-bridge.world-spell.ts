import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const lightBridge = {
  id: "01a06572-95ce-78a3-a1f3-1d62bf9d2350",
  type: "page-type/world-spell",
  slug: "light-bridge",
  title: "Light Bridge",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
