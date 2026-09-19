import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const lightBridges = {
  id: "01a06572-95ce-7af9-a351-f59d033211f9",
  type: "page-type/world-spell",
  slug: "light-bridges",
  title: "Light Bridges",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
