import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const lightSpears = {
  id: "01a06572-95ce-7a85-9778-bcd1b7cc55e2",
  type: "page-type/world-spell",
  slug: "light-spears",
  title: "Light Spears",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
