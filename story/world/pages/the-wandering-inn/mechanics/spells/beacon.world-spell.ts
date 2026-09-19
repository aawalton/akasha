import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const beacon = {
  id: "01a06572-95b5-7099-b0bf-b2e79d365070",
  type: "page-type/world-spell",
  slug: "beacon",
  title: "Beacon",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
