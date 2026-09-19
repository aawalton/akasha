import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const bridgeOfLight = {
  id: "01a06572-95b7-7cfe-8fd0-fa33247d4910",
  type: "page-type/world-spell",
  slug: "bridge-of-light",
  title: "Bridge of Light",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
