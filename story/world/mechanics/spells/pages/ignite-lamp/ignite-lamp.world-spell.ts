import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const igniteLamp = {
  id: "01a06572-95cb-7d1f-b4cb-f15c6d29e11b",
  type: "page-type/world-spell",
  slug: "ignite-lamp",
  title: "Ignite Lamp",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
