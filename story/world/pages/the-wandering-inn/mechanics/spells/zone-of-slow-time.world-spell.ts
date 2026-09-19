import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const zoneOfSlowTime = {
  id: "01a06572-95ea-77ba-b1ff-da7868ced37e",
  type: "page-type/world-spell",
  slug: "zone-of-slow-time",
  title: "Zone of Slow Time",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
