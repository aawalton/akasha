import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const longRangeFireballs = {
  id: "01a06572-95d0-762c-b250-0d2198684dff",
  type: "page-type/world-spell",
  slug: "long-range-fireballs",
  title: "Long Range Fireballs",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
