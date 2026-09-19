import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const shadeBarrier = {
  id: "01a06572-95df-7423-b4e9-58dba117718a",
  type: "page-type/world-spell",
  slug: "shade-barrier",
  title: "Shade Barrier",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
