import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const airVolt = {
  id: "01a06572-95b3-7a8f-8bed-26c227c60042",
  type: "page-type/world-spell",
  slug: "air-volt",
  title: "Air Volt",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
