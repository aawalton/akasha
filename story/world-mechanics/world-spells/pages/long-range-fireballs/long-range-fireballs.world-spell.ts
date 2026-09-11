import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const longRangeFireballs = {
  id: "01a06572-95d0-762c-b250-0d2198684dff",
  type: "world-spell",
  slug: "long-range-fireballs",
  title: "Long Range Fireballs",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
