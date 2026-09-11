import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const beacon = {
  id: "01a06572-95b5-7099-b0bf-b2e79d365070",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "beacon",
  title: "Beacon",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
